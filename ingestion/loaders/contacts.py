import csv
import sqlite3

from ingestion.loaders.utils import getNeuron, getContact
from ingestion.loaders.constants import CSV_ROOT, DB


def load_contacts(output_dir=CSV_ROOT):
    con = sqlite3.connect(DB)
    cur = con.cursor()

    with con:
        with open(f'{output_dir}/contacts.csv', newline='') as csvfile:
            filereader = csv.reader(csvfile, delimiter=',', quotechar='"')
            rownum = 0
            for row in filereader:
                rownum += 1
                if rownum == 1:
                    # header
                    fields = row
                    timepoint_index = fields.index('timepoint')
                    uid_index = fields.index('uid')

                else:
                    # substitute relations to neurons
                    i = 0
                    for field in fields:
                        if field in ['neuronA', 'neuronB']:
                            # replace the neuron uid by the id of the neuron
                            neuron = getNeuron(cur, row[i], row[timepoint_index])
                            row[i] = neuron[0]
                        i += 1

                    contact = getContact(cur, row[uid_index], row[timepoint_index])
                    if not contact:
                        # new
                        q = f"""
                            insert into contacts({','.join(fields)})
                            values (?{',?' * (len(fields) - 1)})
                            """
                        q = cur.execute(q, row)
                    else:
                        # update
                        wherepart = ''
                        setpart = ''
                        i = 0
                        v = []
                        wherevalues = []
                        for field in fields:
                            if field in ['uid', 'timepoint']:
                                if len(wherepart) > 0:
                                    wherepart += 'and '
                                wherepart += f'{field} = ?'
                                wherevalues.append(row[i])
                            else:
                                if len(setpart) > 0:
                                    setpart += ', '
                                setpart += f'{field} = ?'
                                v.append(row[i])
                            i += 1
                        q = f"""
                            update contacts
                            set {setpart}
                            where {wherepart}
                            """
                        cur.execute(q, v + wherevalues)

    con.execute("update contacts set published_at=date('now') where published_at is null")
    con.commit()
    con.close()


if __name__ == '__main__':
    load_contacts()

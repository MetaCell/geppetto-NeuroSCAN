import csv
import sqlite3

from ingestion.loaders.utils import getNeuron

DB = '../../../applications/neuroscan/backend/.tmp/data.db'
con = sqlite3.connect(DB)
cur = con.cursor()

with open('neurons.csv', newline='') as csvfile:
    neuronsreader = csv.reader(csvfile, delimiter=',', quotechar='"')
    rownum = 0
    for row in neuronsreader:
        rownum += 1
        if rownum == 1:
            # header
            fields = row
        else:
            neuron = getNeuron(cur, row[0], row[2])
            if not neuron:
                # new
                q = f"""
                    insert into neurons({','.join(fields)})
                    values (?{',?'*(len(fields)-1)})
                    """
                q = cur.execute(q,row)
            else:
                # update
                wherepart = ''
                setpart = ''
                i = 0
                v = []
                wherevalues = []
                for field in fields:
                    if field in ['uid','timepoint']:
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
                    update neurons
                    set {setpart}
                    where {wherepart}
                    """
                cur.execute(q, v + wherevalues)
            con.commit()

con.close()

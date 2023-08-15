import csv
import json
import sqlite3

from ingestion.loaders.utils import getNeuron, getContact, getSynapse
from ingestion.loaders.constants import CSV_ROOT, DB


def load_synapses(data_dir=CSV_ROOT):
    con = sqlite3.connect(DB)
    cur = con.cursor()

    with con:
        with open(f'{data_dir}/synapses.csv', newline='') as csvfile:
            filereader = csv.reader(csvfile, delimiter=',', quotechar='"')
            rownum = 0
            for row in filereader:
                rownum += 1
                if rownum == 1:
                    # header
                    fields = [field for field in row if field != 'neuronPost']
                    neuronPostIdx = row.index("neuronPost")
                    timepointIdx = row.index("timepoint")
                else:
                    timepoint = row[timepointIdx]
                    # save neuroPost and remove it from row
                    neuronPost = json.loads(row[neuronPostIdx])
                    row.pop(neuronPostIdx)

                    # substitute relations to neurons
                    i = 0
                    for field in fields:
                        if field in ['neuronPre', 'postNeuron']:
                            # replace the neuron uid by the id of the neuron
                            neuron = getNeuron(cur, row[i], timepoint)
                            if neuron:
                                row[i] = neuron[0]
                            else:
                                row[i] = None
                        i += 1

                    synapse = getSynapse(cur, row[0], timepoint)
                    if not synapse:
                        # new
                        q = f"""
                            insert into synapses({','.join(fields)})
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
                            update synapses
                            set {setpart}
                            where {wherepart}
                            """
                        cur.execute(q, v + wherevalues)

                    # process the post neurons and link them to the synapse
                    synapse = synapse = getSynapse(cur, row[0], timepoint)
                    q = f"delete from synapses__neuron_post where synapse_id=?"
                    cur.execute(q, [synapse[0]])
                    if neuronPost:
                        for neuron in neuronPost:
                            neuron = getNeuron(cur, neuron, timepoint)
                            if neuron:
                                q = f"insert into synapses__neuron_post(synapse_id, neuron_id) values (?,?)"
                                cur.execute(q, [synapse[0], neuron[0]])

    con.execute("update synapses set published_at=date('now') where published_at is null")
    con.commit()
    con.close()


if __name__ == '__main__':
    load_synapses()

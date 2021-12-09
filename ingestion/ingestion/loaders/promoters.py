import csv
import sqlite3

from ingestion.loaders.utils import getPromoter

DB = '../../../applications/neuroscan/backend/.tmp/data.db'
con = sqlite3.connect(DB)
cur = con.cursor()

with open('promoters.csv', newline='') as csvfile:
    filereader = csv.reader(csvfile, delimiter=',', quotechar='"')
    rownum = 0
    for row in filereader:
        rownum += 1
        if rownum == 1:
            # header
            fields = row
        else:
            promoter = getPromoter(cur, row[0])
            if not promoter:
                # new
                q = f"""
                    insert into promoters({','.join(fields)})
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
                    if field in ['uid']:
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
                    update promoters
                    set {setpart}
                    where {wherepart}
                    """
                cur.execute(q, v + wherevalues)
            con.commit()

con.close()
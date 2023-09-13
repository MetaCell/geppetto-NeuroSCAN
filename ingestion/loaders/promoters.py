import csv
import sqlite3

from ingestion.loaders.utils import getPromoter
from ingestion.loaders.constants import CSV_ROOT, DB


def load_promoters(db_path=DB, data_dir=CSV_ROOT):
    con = sqlite3.connect(db_path)
    cur = con.cursor()

    with con:
        with open(f'{data_dir}/promoters.csv', newline='') as csvfile:
            filereader = csv.reader(csvfile, delimiter=',', quotechar='"')
            rownum = 0
            for row in filereader:
                rownum += 1
                if rownum == 1:
                    # header
                    fields = row
                    uid_index = fields.index('uid')
                else:
                    promoter = getPromoter(cur, row[uid_index])
                    if not promoter:
                        # new
                        q = f"""
                            insert into promoters({','.join(fields)})
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

    con.execute("update promoters set published_at=date('now') where published_at is null")
    con.commit()
    con.close()


if __name__ == '__main__':
    load_promoters()

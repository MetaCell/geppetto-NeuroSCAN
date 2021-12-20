import argparse
import csv
import sqlite3
from pathlib import Path

from ingestion.loaders.utils import getCphate
from ingestion.loaders.constants import CSV_ROOT, DB

parser = argparse.ArgumentParser(description='Get timepoint.')
parser.add_argument('--timepoint', type=int, required=True,
                    help='timepoint of the cphate')
args = parser.parse_args()
timepoint = args.timepoint

con = sqlite3.connect(DB)
cur = con.cursor()

with con:
    structure = Path(f'{CSV_ROOT}/cphate.json').read_text()
    cphate = getCphate(cur, timepoint)
    if not cphate:
        # new
        q = """
            insert into cphates(name, structure, timepoint)
            values (?,?,?)
            """
        con.execute(q, [timepoint, structure, timepoint])
    else:
        # update
        q = """
        update cphates set structure=? where timepoint=?
        """
        con.execute(q, [structure, timepoint])

con.execute("update cphates set published_at=date('now') where published_at is null")
con.commit()
con.close()

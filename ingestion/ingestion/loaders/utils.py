from sqlite3 import Cursor


def getNeuron(cur: Cursor, uid: str, timepoint: int) -> []:
    q = cur.execute("select * from neurons where uid=(?) and timepoint=(?)", [uid, timepoint])
    return q.fetchone()


def getContact(cur: Cursor, uid: str, timepoint: int) -> []:
    q = cur.execute("select * from contacts where uid=(?) and timepoint=(?)", [uid, timepoint])
    return q.fetchone()


def getSynapse(cur: Cursor, uid: str, timepoint: int) -> []:
    q = cur.execute("select * from synapses where uid=(?) and timepoint=(?)", [uid, timepoint])
    return q.fetchone()

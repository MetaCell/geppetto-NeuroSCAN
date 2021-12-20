from sqlite3 import Cursor


def getCphate(cur: Cursor, timepoint: int) -> []:
    q = cur.execute("select * from cphates where timepoint=?", [timepoint])
    return q.fetchone()


def getNeuron(cur: Cursor, uid: str, timepoint: int) -> []:
    q = cur.execute("select * from neurons where uid=(?) and timepoint=?", [uid, timepoint])
    return q.fetchone()


def getContact(cur: Cursor, uid: str, timepoint: int) -> []:
    q = cur.execute("select * from contacts where uid=(?) and timepoint=?", [uid, timepoint])
    return q.fetchone()


def getSynapse(cur: Cursor, uid: str, timepoint: int) -> []:
    q = cur.execute("select * from synapses where uid=? and timepoint=?", [uid, timepoint])
    return q.fetchone()


def getPromoter(cur: Cursor, uid: str) -> []:
    q = cur.execute("select * from promoters where uid=?", [uid])
    return q.fetchone()

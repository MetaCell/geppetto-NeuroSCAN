from enum import Enum


class ExtendedEnum(Enum):
    @classmethod
    def list(cls):
        return list(map(lambda c: c.value, cls))


class JoinStrategies(ExtendedEnum):
    LEFT = 'left'
    RIGHT = 'right'
    FULL = 'full'
    INNER = 'inner'


def merge_dict(dict1, dict2, strategy):
    ''' Merge dictionaries and keep values of common keys in list'''
    dict3 = None
    if strategy == JoinStrategies.FULL.value:
        dict3 = {**dict1, **dict2}
    elif strategy == JoinStrategies.RIGHT.value:
        dict3 = {**dict2}
    elif strategy == JoinStrategies.LEFT.value:
        dict3 = {**dict1}
    elif strategy == JoinStrategies.INNER.value:
        dict3 = {k: {} for k in set(dict1.keys()).intersection(set(dict2.keys()))}
    for key, value in dict3.items():
        if key in dict1 and key in dict2:
            dict3[key] = {}
            for k in dict1[key].keys():
                dict3[key][k] = dict1[key][k]
            for k in dict2[key].keys():
                dict3[key][k] = dict2[key][k]
    return dict3


class obj(object):
    def __init__(self, d):
        for a, b in d.items():
            if isinstance(b, (list, tuple)):
                setattr(self, a, [obj(x) if isinstance(x, dict) else x for x in b])
            else:
                setattr(self, a, obj(b) if isinstance(b, dict) else b)


def get_dict_without_keys(d, keys):
    return {x: d[x] for x in d if x not in keys}


def get(d, keys):
    if "." in keys:
        key, rest = keys.split(".", 1)
        return get(d[key], rest)
    else:
        return d[keys]

import json
import sys


def merge_dict(dict1, dict2, only_update=False):
    ''' Merge dictionaries and keep values of common keys in list'''
    dict3 = {**dict1, **dict2} if not only_update else {**dict2}
    for key, value in dict3.items():
        if key in dict1 and key in dict2:
            dict3[key] = {}
            for k in value.keys():
                dict3[key][k] = value[k]
            for k in dict1[key].keys():
                dict3[key][k] = dict1[key][k]
    return dict3


class Config:
    def __init__(self, config_path):
        f = open(config_path, )
        self.data = json.load(f)

    def get_config(self):
        return obj(self.data)


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

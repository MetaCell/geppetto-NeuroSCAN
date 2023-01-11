import re
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
    splits = {**dict1, **dict2}
    merged = {}
    for split in splits:
        dict3 = None
        if strategy == JoinStrategies.FULL.value:
            dict3 = {**dict1.get(split, {}), **dict2.get(split, {})}
        elif strategy == JoinStrategies.RIGHT.value:
            dict3 = {**dict2.get(split, {})}
        elif strategy == JoinStrategies.LEFT.value:
            dict3 = {**dict1.get(split, {})}
        elif strategy == JoinStrategies.INNER.value:
            dict3 = {k: {} for k in
                     set(dict1.get(split, {}).keys()).intersection(set(dict2.get(split, {}).keys()))}
        for key, value in dict3.items():
            if key in dict1.get(split, {}) and key in dict2.get(split, {}):
                dict3[key] = {}
                for k in dict1[split][key].keys():
                    dict3[key][k] = dict1[split][key][k]
                for k in dict2[split][key].keys():
                    dict3[key][k] = dict2[split][key][k]
        if dict3:
            merged[split] = dict3
    return merged


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


def apply_regex(pattern, test_string: str):
    if pattern.match:
        return _construct_match(pattern, test_string)
    else:
        return re.findall(rf'{pattern.expression}', test_string)[0]


def _construct_match(pattern, test_string):
    re_search = re.search(rf'{pattern.expression}', test_string)
    groups = re.findall('\$([1-9]*)', pattern.match)
    result = pattern.match
    for groupId in groups:
        result = result.replace(f'${groupId}', re_search.group(int(groupId)))
    return result


def get_source_split(source, split):
    if split:
        try:
            return apply_regex(split, source)
        except Exception as e:
            return 'unknown_source'
    return 'common_source'

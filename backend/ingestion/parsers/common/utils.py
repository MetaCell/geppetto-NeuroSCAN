import json
import sys


def merge_dict(dict1, dict2):
  ''' Merge dictionaries and keep values of common keys in list'''
  dict3 = {**dict1, **dict2}
  for key, value in dict3.items():
    if key in dict1 and key in dict2:
      source1 = list(value.keys())[0]
      source2 = list(dict1[key].keys())[0]
      dict3[key] = {source1: value[source1], source2: dict1[key][source2]}
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


def get_args():
  import argparse

  parser = argparse.ArgumentParser(description='Parser argument parser')

  parser.add_argument('--config', '-c', dest='config', type=str, action="store", nargs='?',
                      default="config.json", help='Config file paht')

  args = parser.parse_args([arg for arg in sys.argv[1:]])

  return args


def get_dict_without_keys(d, keys):
  return {x: d[x] for x in d if x not in keys}

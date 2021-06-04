import json
import sys


class Config:
  def __init__(self, config_path):
    f = open(config_path, )
    self.data = json.load(f)

  def getConfig(self):
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


def without_keys(d, keys):
  return {x: d[x] for x in d if x not in keys}

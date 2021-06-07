
import pandas as pd
import os

from ingestion.parsers.common.IParser import IParser
from ingestion.parsers.common.utils import Config


class CSVParser(IParser):

  mandatory_attributes = ['filepath', 'column_id']

  def __init__(self, config: Config):
    if all(item in list(config.__dict__.keys()) for item in self.mandatory_attributes):
      self.cfg = config
      self.data = {}
    else:
      raise Exception('Wrong configuration for CSVParser')

  def parse(self):
    df = pd.read_excel(self.cfg.filepath)
    column_of_interest = [self.cfg.column_id] + list(self.cfg.column_of_interest.__dict__.keys())
    [self._update_data(row) for row in df[column_of_interest].to_numpy()]

  def _update_data(self, row):
    row_id = row[0]
    source = os.path.basename(self.cfg.filepath)
    if row_id in self.data:
      self.data[row_id][source] = self._get_dict_from_row(row[1:])
    else:
      self.data[row_id] = {source: self._get_dict_from_row(row[1:])}

  def _get_dict_from_row(self, row):
    d = {}
    for i in range(0, len(row)):
      d[list(self.cfg.column_of_interest.__dict__.values())[i]] = row[i]
    return d

  def get_data(self):
    return self.data

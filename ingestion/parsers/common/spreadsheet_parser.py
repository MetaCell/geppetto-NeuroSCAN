import re

import pandas as pd
import os

from ingestion.parsers.common.IParser import IParser
from ingestion.parsers.common.utils import Config


def get_columns_from_expression(expression):
    matches = re.findall(r'\${.*?}', expression)
    return [match.replace('${', '').replace('}', '') for match in matches]


class SpreadsheetParser(IParser):
    mandatory_attributes = ['filepath', 'column_id']

    def __init__(self, config: Config, is_csv=False):
        if all(item in list(config.__dict__.keys()) for item in self.mandatory_attributes):
            self.cfg = config
            self.data = {}
            self.is_csv = is_csv
        else:
            raise Exception('Wrong configuration for SpreadsheetParser')

    def parse(self):
        df = pd.read_excel(self.cfg.filepath) if not self.is_csv else pd.read_csv(self.cfg.filepath)
        column_of_interest = list(set(get_columns_from_expression(self.cfg.column_id) + self._get_list_of_coi()))
        [self._update_data(row, column_of_interest) for row in df[column_of_interest].to_numpy()]

    def _get_list_of_coi(self):
        list_of_coi = []
        for coi in self.cfg.column_of_interest.__dict__.keys():
            if len(re.findall(r'\${.*?}', coi))!=0:
                list_of_coi.extend(get_columns_from_expression(coi))
            else:
                list_of_coi.append(coi)
        return list_of_coi

    def _update_data(self, row, column_of_interest):
        row_id = self._get_value_from_expression(row, column_of_interest, self.cfg.column_id)
        source = os.path.basename(self.cfg.filepath)
        if row_id in self.data:
            self.data[row_id][source] = self._get_dict_from_row(row, column_of_interest)
        else:
            self.data[row_id] = {source: self._get_dict_from_row(row, column_of_interest)}

    def _get_value_from_expression(self, row, column_of_interest, expression):
        value = expression
        cols = get_columns_from_expression(expression)
        if cols:
            for match in cols:
                try:
                    value = value.replace(f'$\u007b{match}\u007d', str(row[column_of_interest.index(match)]))
                except TypeError:
                    return None
            return value
        return row[column_of_interest.index(expression)]

    def _get_dict_from_row(self, row, column_of_interest):
        d = {}
        for key in self.cfg.column_of_interest.__dict__.keys():
            d[self.cfg.column_of_interest.__dict__[key]] = self._get_value_from_expression(row, column_of_interest, key)
        return d

    def get_data(self):
        return self.data

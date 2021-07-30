import re

import pandas as pd
import os

from ingestion.parsers.common.IParser import IParser
from ingestion.parsers.common.utils import get_source_split


def get_columns_from_expression(expression):
    matches = re.findall(r'\${.*?}', expression)
    return [match.replace('${', '').replace('}', '') for match in matches]


class SpreadsheetParser(IParser):
    mandatory_attributes = ['column_id']

    def __init__(self, config):
        if all(item in list(config.__dict__.keys()) for item in self.mandatory_attributes):
            self.cfg = config
            self.data = {}
        else:
            raise Exception('Wrong configuration for SpreadsheetParser')

    def parse(self):
        if getattr(self.cfg, 'filepath', None):
            self._read_csv(self.cfg.filepath)
        if getattr(self.cfg, 'directory', None) and getattr(self.cfg, 'include', None):
            self.traverse()

    def _read_csv(self, filepath):
        is_csv = self._is_csv(filepath)
        df = pd.read_excel(filepath, sheet_name=self.cfg.sheet_name) if not is_csv else pd.read_csv(filepath)
        column_of_interest = list(set(get_columns_from_expression(self.cfg.column_id) + self._get_list_of_coi()))
        [self._update_data(row, column_of_interest, filepath) for row in df[column_of_interest].to_numpy()]

    def traverse(self):
        for subdir, dirs, files in os.walk(self.cfg.directory):
            for file in files:
                filepath = os.path.join(subdir, file)
                if self._is_included(filepath):
                    self._read_csv(filepath)

    def _is_included(self, filepath):
        return re.match(rf"{self.cfg.include}", filepath)

    def _get_list_of_coi(self):
        list_of_coi = []
        for coi in self.cfg.column_of_interest.__dict__.keys():
            if len(re.findall(r'\${.*?}', coi)) != 0:
                list_of_coi.extend(get_columns_from_expression(coi))
            else:
                list_of_coi.append(coi)
        return list_of_coi

    def _update_data(self, row, column_of_interest, filepath):
        row_id = self._get_value_from_expression(row, column_of_interest, self.cfg.column_id)
        source_split = get_source_split(filepath, getattr(self.cfg, 'split', None))
        if source_split not in self.data:
            self.data[source_split] = {row_id: {filepath: self._get_dict_from_row(row, column_of_interest)}}
        else:
            if row_id in self.data[source_split]:
                self.data[source_split][row_id][filepath] = self._get_dict_from_row(row, column_of_interest)
            else:
                self.data[source_split][row_id] = {filepath: self._get_dict_from_row(row, column_of_interest)}

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

    @staticmethod
    def _is_csv(filepath):
        _, file_extension = os.path.splitext(filepath)
        return file_extension == '.csv'

import os
import re
import logging

from ingestion.parsers.common.IParser import IParser
from ingestion.parsers.common.utils import get_dict_without_keys, apply_regex, get_source_split

logging.basicConfig(filename='filename_parser_errors.log', level=logging.ERROR)


class FilenameParser(IParser):
    mandatory_attributes = ['directory', 'regex', 'include']

    def __init__(self, config):
        if all(item in list(config.__dict__.keys()) for item in self.mandatory_attributes):
            self.cfg = config
            self.data = {}
        else:
            raise Exception('Wrong configuration for FilenameParser')
        if self.cfg.regex.id is None:
            raise Exception('regex id attribute is required')

    def parse(self):
        for subdir, dirs, files in os.walk(self.cfg.directory):
            for file in files:
                filepath = os.path.join(subdir, file)
                if self._is_included(filepath):
                    self._update_data(self._get_fields(filepath), filepath)

    def _is_included(self, filepath):
        return re.match(rf"{self.cfg.include}", filepath)

    def _get_fields(self,
                    filename):  # Returns dictionary with all the pairs (key, applied regex) for the regex specified in config file.
        return {key: self._apply_regex(filename, key) for key in self.cfg.regex.__dict__.keys()}

    def _apply_regex(self, test_string: str, key):
        pattern = self.cfg.regex.__dict__[key]
        try:
            return apply_regex(pattern, test_string)
        except:
            logging.error(f"{test_string} failed to get fields")

    def _update_data(self, fields, filename):
        augmented_fields = {**fields, 'files': self._get_filepath(filename)}
        source_split = get_source_split(filename, getattr(self.cfg, 'split', None))
        if source_split not in self.data:
            self.data[source_split] = {fields['id']: {filename: get_dict_without_keys(augmented_fields, ['id'])}}
        else:
            if fields['id'] in self.data[source_split]:
                self.data[source_split][fields['id']][filename] = get_dict_without_keys(augmented_fields, ['id'])
            else:
                self.data[source_split][fields['id']] = {filename: get_dict_without_keys(augmented_fields, ['id'])}

    def get_data(self):
        return self.data

    def _get_filepath(self, filename):
        return filename

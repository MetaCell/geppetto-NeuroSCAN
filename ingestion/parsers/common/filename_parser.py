import os
import re
import logging

from ingestion.parsers.common.IParser import IParser
from ingestion.parsers.common.utils import get_dict_without_keys

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
            if pattern.match:
                return self._construct_match(pattern, test_string)
            else:
                return re.findall(rf'{pattern.expression}', test_string)[0]
        except:
            logging.error(f"{test_string} failed to get fields")

    def _construct_match(self, pattern, test_string):
        re_search = re.search(rf'{pattern.expression}', test_string)
        groups = re.findall('\$([1-9]*)', pattern.match)
        result = pattern.match
        for groupId in groups:
            result = result.replace(f'${groupId}', re_search.group(int(groupId)))
        return result

    def _update_data(self, fields, filename):
        augmented_fields = {**fields, 'files': self._get_filepath(filename)}
        if fields['id'] in self.data:
            self.data[fields['id']][filename] = get_dict_without_keys(augmented_fields, ['id'])
        else:
            self.data[fields['id']] = {filename: get_dict_without_keys(augmented_fields, ['id'])}

    def get_data(self):
        return self.data

    # todo: update when know ftp file structure
    def _get_filepath(self, filename):
        return os.path.join(self.cfg.directory, filename)

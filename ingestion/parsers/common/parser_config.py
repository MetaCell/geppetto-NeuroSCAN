import json

from ingestion.parsers.common.filename_parser import FilenameParser
from ingestion.parsers.common.spreadsheet_parser import SpreadsheetParser
from ingestion.parsers.common.utils import obj
from ingestion.parsers.common.web_parser import WebParser


class ParserConfig:
    parsers = {
        'file': FilenameParser,
        'xls': SpreadsheetParser,
        'web': WebParser,
    }

    def __init__(self, config_path):
        f = open(config_path)
        self.data = json.load(f)

    def get_config(self):
        return obj(self.data)

    def get_parser(self):
        if self.data['parser'] in self.parsers.keys():
            return self.parsers[self.data['parser']](self.get_config())

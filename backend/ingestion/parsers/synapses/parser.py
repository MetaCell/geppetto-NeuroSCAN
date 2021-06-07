from backend.ingestion.parsers.common.csv_parser import CSVParser
from backend.ingestion.parsers.common.data_exporter import DataExporter
from backend.ingestion.parsers.common.filename_parser import FilenameParser
from backend.ingestion.parsers.common.utils import Config, merge_dict
from backend.ingestion.parsers.common.web_parser import WebParser

HEADER = ['name', 'metadata', 'timepoints', 'files', 'wormatlas', 'lineage', 'location']
PREFIX_URL = 'https://www.wormatlas.org/neurons/Individual%20Neurons/'


def get_obj_data():
  obj_parser = FilenameParser(Config('filename_config.json').get_config())
  obj_parser.parse()
  return obj_parser.get_data()


def main():
  DataExporter(get_obj_data()).to_csv(headers=HEADER)


if __name__ == '__main__':
  main()

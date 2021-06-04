from backend.ingestion.parsers.common.csv_parser import CSVParser
from backend.ingestion.parsers.common.data_exporter import DataExporter
from backend.ingestion.parsers.common.filename_parser import FilenameParser
from backend.ingestion.parsers.common.utils import Config, merge_dict

HEADER = ['name', 'metadata',	'timepoints',	'files', 'wormatlas', 'lineage', 'location']

def get_obj_data():
  obj_parser = FilenameParser(Config('filename_config.json').get_config())
  obj_parser.parse()
  return obj_parser.get_data()


def get_csv_data():
  csv_parser = CSVParser(Config('xlsx_config.json').get_config())
  csv_parser.parse()
  return csv_parser.get_data()


def main():
  merged_data = merge_dict(get_obj_data(), get_csv_data())
  DataExporter(merged_data).to_csv(headers=HEADER)


if __name__ == '__main__':
  main()

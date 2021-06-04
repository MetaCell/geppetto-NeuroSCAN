from backend.ingestion.parsers.common.csv_parser import CSVParser
from backend.ingestion.parsers.common.filename_parser import FilenameParser
from backend.ingestion.parsers.common.utils import Config, merge_dict


def main():
  obj_parser = FilenameParser(Config('./filename_config.json').get_config())
  obj_parser.parse()
  obj_data = obj_parser.get_data()
  csv_parser = CSVParser(Config('csv_config.json').get_config())
  csv_parser.parse()
  csv_data = csv_parser.get_data()
  merged_data = merge_dict(obj_data, csv_data)
  print(merged_data)


if __name__ == '__main__':
  main()

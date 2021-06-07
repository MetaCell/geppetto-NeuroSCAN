from ingestion.parsers.common.csv_parser import CSVParser
from ingestion.parsers.common.data_exporter import DataExporter
from ingestion.parsers.common.filename_parser import FilenameParser
from ingestion.parsers.common.utils import Config, merge_dict
from ingestion.parsers.common.web_parser import WebParser

HEADER = ['name', 'metadata', 'timepoints', 'files', 'wormatlas', 'lineage', 'location']
PREFIX_URL = 'https://www.wormatlas.org/neurons/Individual%20Neurons/'


def get_obj_data():
  obj_parser = FilenameParser(Config('filename_config.json').get_config())
  obj_parser.parse()
  return obj_parser.get_data()


def get_xlsx_data():
  csv_parser1 = CSVParser(Config('xlsx_config.json').get_config())
  csv_parser1.parse()
  csv_parser2 = CSVParser(Config('xlsx_config2.json').get_config())
  csv_parser2.parse()
  return merge_dict(csv_parser1.get_data(), csv_parser2.get_data())


def get_web_data():
  config = Config('web_config.json').get_config()
  source = config.url
  web_parser = WebParser(config)
  web_parser.parse()
  data = web_parser.get_data()
  for entry in data:
    data[entry][source]['wormatlas'] = PREFIX_URL + data[entry][source]['wormatlas']
  return data


def main():
  merged_data = merge_dict(get_web_data(), merge_dict(get_obj_data(), get_xlsx_data()))
  DataExporter(merged_data).to_csv(output_file='neurons.csv', headers=HEADER)


if __name__ == '__main__':
  main()

from ingestion.parsers.common.data_exporter import DataExporter
from ingestion.parsers.common.filename_parser import FilenameParser
from ingestion.parsers.common.utils import Config

HEADER = ['name', 'pre', 'post', 'type', 'stages', 'files', 'metadata']


def get_obj_data():
  obj_parser = FilenameParser(Config('filename_config.json').get_config())
  obj_parser.parse()
  return obj_parser.get_data()


def main():
  objs_data = get_obj_data()
  DataExporter(objs_data).to_csv(headers=HEADER)


if __name__ == '__main__':
  main()

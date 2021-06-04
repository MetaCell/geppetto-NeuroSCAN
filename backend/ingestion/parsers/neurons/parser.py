from backend.ingestion.common.filename_parser import FilenameParser
from backend.ingestion.common.utils import Config


def main():
  obj_parser = FilenameParser(Config('./filename_config.json').getConfig())
  obj_parser.parse()
  obj_data = obj_parser.get_data()
  print(obj_data)


if __name__ == '__main__':
    main()

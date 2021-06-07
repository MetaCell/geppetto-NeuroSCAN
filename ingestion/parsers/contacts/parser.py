import re

from ingestion.parsers.common.csv_parser import CSVParser
from ingestion.parsers.common.data_exporter import DataExporter
from ingestion.parsers.common.filename_parser import FilenameParser
from ingestion.parsers.common.utils import Config, merge_dict

HEADER = ['name', 'neuronA', 'neuronB', 'stages', 'files', 'weight', 'metadata']


def get_xlsx_data():
    csv_parser = CSVParser(Config('xlsx_config.json').get_config())
    csv_parser.parse()
    return csv_parser.get_data()


def get_obj_data():
    obj_parser = FilenameParser(Config('filename_config.json').get_config())
    obj_parser.parse()
    return obj_parser.get_data()


def main():
    obj_data = get_obj_data()
    xls_data = get_xlsx_data()
    merged_data = merge_dict(obj_data, xls_data)
    DataExporter(merged_data).to_csv(output_file='contacts.csv', headers=HEADER)


if __name__ == '__main__':
    main()

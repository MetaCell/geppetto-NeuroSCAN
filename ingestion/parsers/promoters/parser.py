from ingestion.parsers.common.csv_parser import CSVParser
from ingestion.parsers.common.data_exporter import DataExporter
from ingestion.parsers.common.utils import Config, merge_dict

HEADER = ['name', 'expressionBegin', 'expressionTermination', 'files', 'cellsByLineaging', 'geneFunction', 'wormbase',
          'cellularExpressionPattern']


def get_inverse_xlsx_data():
    csv_parser = CSVParser(Config('xlsx_config2.json').get_config())
    csv_parser.parse()
    return csv_parser.get_data()


def get_xlsx_data():
    csv_parser = CSVParser(Config('xlsx_config.json').get_config())
    csv_parser.parse()
    return csv_parser.get_data()


def invert_dict(inverse_dict):
    new_dict = {}
    for neuron in inverse_dict:
        for source in inverse_dict[neuron]:
            for promoter in get_promoters_from_string(inverse_dict[neuron][source]['promoter']):
                if promoter in new_dict:
                    new_dict[promoter][source]['cellsByLineaging'].append(neuron)
                else:
                    new_dict[promoter] = {
                        source: {
                            'name': promoter,
                            'cellsByLineaging': [neuron]
                        }
                    }

    return new_dict


def get_promoters_from_string(promoter_string):
    return [promoter.strip() for promoter in promoter_string.split(',') if promoter != 'nan']


def main():
    xlsx_data2 = invert_dict(get_inverse_xlsx_data())
    DataExporter(merge_dict(get_xlsx_data(), xlsx_data2)).to_csv(output_file='promoters.csv', headers=HEADER)


if __name__ == '__main__':
    main()

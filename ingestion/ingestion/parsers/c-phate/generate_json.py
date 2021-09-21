import json
import re

import pandas as pd

from ingestion.parsers.common.filename_parser import FilenameParser
from ingestion.parsers.common.config import Config

NEURON_COL_NAME = 'Neuron'
ITER_COL_IDENTIFIER = 'iter'
SHEET_NAME = 'CPHATE clusters'
INPUT_CSV = '../../../data/neuroscan/L4_JSH/300/cphate.xls'
OUTPUT_JSON = 'cphate.json'


def get_groups_from_xlsx(filepath):
    df = pd.read_excel(filepath, sheet_name=SHEET_NAME)
    group_dict, coi = get_iter_from_header(df)
    for row in df[coi].to_numpy():
        neuron = row[0]
        for i, g in enumerate(row[1:]):
            group = get_group_key(g)
            iter = get_iter_key(i + 1)
            if group in group_dict[iter]:
                group_dict[iter][group]['neurons'].append(neuron)
            else:
                group_dict[iter][group] = {'neurons': [neuron]}
    return group_dict


def get_filename_data():
    obj_parser = FilenameParser(Config('filename_config.json').get_config())
    obj_parser.parse()
    return obj_parser.get_data()


def get_iter_from_header(df):
    group_dict = {}
    coi = [NEURON_COL_NAME]
    for col in df.columns:
        if is_iter(col):
            group_dict[get_iter_step(col)] = {}
            coi.append(col)
    return group_dict, coi


def is_iter(name):
    return ITER_COL_IDENTIFIER in name


def get_iter_step(name):
    return get_iter_key(int(name.split(ITER_COL_IDENTIFIER)[1]))


def get_iter_key(i):
    return f'i{i}'


def get_group_key(g):
    return f'g{g}'


def add_objfile(data_dict):
    filename_data = get_filename_data()
    for split in filename_data:
        for i in filename_data[split]:
            split_i = i.split('-')
            iter = get_iter_key(split_i[0])
            group = get_group_key(split_i[1])
            for source in filename_data[split][i]:
                data_dict[iter][group]['objFile'] = filename_data[split][i][source]['filename']
    return data_dict


def dict_to_array(data_dict):
    data_array = []
    for i in data_dict:
        for g in data_dict[i]:
            data_array.append(
                {
                    'i': get_number(i),
                    'g': get_number(g),
                    **data_dict[i][g]
                }
            )
    return data_array


def get_number(string):
    return int(re.findall(r'\d+', string)[0])


def write_json(data, output_file):
    with open(output_file, 'w') as outfile:
        json.dump(data, outfile, indent=2)


def generate_json(filepath, output_file='output.json'):
    write_json(dict_to_array(add_objfile(get_groups_from_xlsx(filepath))), output_file)


if __name__ == '__main__':
    generate_json(INPUT_CSV, OUTPUT_JSON)

import json
import pandas as pd

NEURON_COL_NAME = 'Neuron'
ITER_COL_IDENTIFIER = 'iter'


def get_groups_from_xlsx(filepath):
    df = pd.read_excel(filepath)
    group_dict, coi = get_iter_from_header(df)
    for row in df[coi].to_numpy():
        neuron = row[0]
        for i, g in enumerate(row[1:]):
            group = f'g{g}'
            iter = get_iter_key(i+1)
            if group in group_dict[iter]:
                group_dict[iter][group].append(neuron)
            else:
                group_dict[iter][group] = [neuron]
    return group_dict


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
    for s in name.split():
        if s.isdigit():
            return get_iter_key(int(s))


def get_iter_key(i):
    return f'i{i}'


def write_json(data, output_file):
    with open(output_file, 'w') as outfile:
        json.dump(data, outfile)


def generate_json(filepath, output_file='output.json'):
    write_json(get_groups_from_xlsx(filepath), output_file)


if __name__ == '__main__':
    generate_json('../../data/JSH_CPHATE clusters.xlsx', 'cphate_matrix.json')

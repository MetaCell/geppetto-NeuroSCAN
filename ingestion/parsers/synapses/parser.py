import re

from ingestion.parsers.common.data_exporter import DataExporter
from ingestion.parsers.common.filename_parser import FilenameParser
from ingestion.parsers.common.utils import Config, merge_dict

HEADER = ['name', 'pre', 'post', 'type', 'stages', 'files', 'metadata']
REGEX_EXPRESSION = "(?:chemical|electrical).*?_(.*?)_(?:certain|uncertain).*(?:certain|uncertain)"


def handle_multiple_synapse_references(data: dict):
    new_data = data.copy()
    for synapse_pair in data:
        for source in data[synapse_pair]:
            pre_neuron = data[synapse_pair][source]['pre']
            _type = data[synapse_pair][source]['type']
            try:
                neurons_to_add = re.search(rf'{REGEX_EXPRESSION}', source).group(1).split('_')
                for neuron in neurons_to_add:
                    new_synapse_id = f'{pre_neuron}-{neuron}-{_type}'
                    if new_synapse_id in new_data:
                        new_data[new_synapse_id][source] = get_synapse_data(name=new_synapse_id, pre=pre_neuron,
                                                                            post=neuron, _type=_type, files=source)
                    else:
                        new_data[new_synapse_id] = {
                            source: get_synapse_data(name=new_synapse_id, pre=pre_neuron, post=neuron, _type=_type,
                                                     files=source)
                        }
            except AttributeError:
                continue
    return new_data


def get_synapse_data(name, pre, post, _type, files):
    return {
        'name': name,
        'pre': pre,
        'post': post,
        'type': _type,
        'files': files
    }


def get_pre_obj_data():
    obj_parser = FilenameParser(Config('pre_config.json').get_config())
    obj_parser.parse()
    return obj_parser.get_data()


def get_post_obj_data():
    obj_parser = FilenameParser(Config('post_config.json').get_config())
    obj_parser.parse()
    return obj_parser.get_data()


def main():
    pre_objs_data = handle_multiple_synapse_references(get_pre_obj_data())
    post_objs_data = handle_multiple_synapse_references(get_post_obj_data())
    merged_data = merge_dict(pre_objs_data, post_objs_data)
    DataExporter(merged_data).to_csv(output_file='synapses.csv', headers=HEADER)


if __name__ == '__main__':
    main()

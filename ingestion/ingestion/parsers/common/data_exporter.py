import csv
from ingestion.parsers.common.utils import apply_regex


class DataExporter:
    def __init__(self, data):
        self.data = data

    def to_csv(self, output_file='output.csv', headers=None):
        if headers is None:
            headers = self.extrapolate_headers()
        dict_data = self.simplify_data(headers)
        for split_data in dict_data:
            with open(self._get_filename(output_file, split_data), 'w') as csvfile:
                writer = csv.DictWriter(csvfile, fieldnames=headers)
                writer.writeheader()
                for data in dict_data[split_data]:
                    writer.writerow(dict_data[split_data][data])
        return True

    def simplify_data(self, headers):
        simplified_data = {}
        for split in self.data:
            for key in self.data[split]:
                for source in self.data[split][key]:
                    entry_data = self._get_header_attributes(self.data[split][key][source], headers)
                    if split not in simplified_data:
                        simplified_data[split] = {key: entry_data}
                    else:
                        if key not in simplified_data[split]:
                            simplified_data[split][key] = entry_data
                        else:
                            simplified_data[split][key] = self._merge_data(simplified_data[split][key],
                                                                           entry_data, headers)
        return simplified_data

    def extrapolate_headers(self):
        headers = set()
        for key in self.data:
            for source in self.data[key]:
                for k in self.data[key][source].keys():
                    headers.add(k)
        return list(headers)

    @staticmethod
    def _get_filename(output_file, source):
        return output_file.replace('${split}', source)

    @staticmethod
    def _merge_data(source1, source2, headers):
        merged_data = {}
        for h in headers:
            if source1[h] and source2[h]:
                if source1[h] == source2[h]:
                    merged_data[h] = source1[h]
                else:
                    if isinstance(source1[h], list):
                        merged_data[h] = [*source1[h], source2[h]]
                    else:
                        merged_data[h] = [source1[h], source2[h]]
                continue
            if source1[h] is not None:
                merged_data[h] = source1[h]
                continue
            if source2[h] is not None:
                merged_data[h] = source2[h]
                continue
            merged_data[h] = None
        return merged_data

    @staticmethod
    def _get_header_attributes(source, headers):
        entry_data = {}
        for h_attr in headers:
            entry_data[h_attr] = source[h_attr] if h_attr in source.keys() else None
        return entry_data

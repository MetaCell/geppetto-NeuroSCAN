import csv


class DataExporter:
  def __init__(self, data):
    self.data = data

  def to_csv(self, output_file='output.csv', headers=None):
    if headers is None:
      headers = self.extrapolate_headers()
    dict_data = self.simplify_data(headers)
    with open(output_file, 'w') as csvfile:
      writer = csv.DictWriter(csvfile, fieldnames=headers)
      writer.writeheader()
      for data in dict_data:
        writer.writerow(data)

  def simplify_data(self, headers):
    simplified_data = {}
    for key in self.data:
      for source in self.data[key]:
        entry_data = self._get_header_attributes(self.data[key][source], headers)
        if key not in simplified_data:
          simplified_data[key] = entry_data
        else:
          simplified_data[key] = self._merge_data(simplified_data[key], entry_data, headers)
    return simplified_data

  def _merge_data(self, source1, source2, headers):
    merged_data = {}
    for h in headers:
      if source1[h] and source2[h]:
        merged_data[h] = [source1[h], source2[h]]
        continue
      if source1[h]:
        merged_data[h] = source1[h]
        continue
      if source2[h]:
        merged_data[h] = source2[h]
        continue
      merged_data[h] = None
    return merged_data


  def _get_header_attributes(self, source, headers):
    entry_data = {}
    for h_attr in headers:
      entry_data[h_attr] = source[h_attr] if h_attr in source.keys() else None
    return entry_data


  def extrapolate_headers(self):
    headers = set()
    for key in self.data:
      for source in self.data[key]:
        for k in self.data[key][source].keys():
          headers.add(k)
    return list(headers)

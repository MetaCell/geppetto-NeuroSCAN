import csv
import json
from typing import Dict, Any, List

from ingestion.parsers.models import CphateClusterIteration
from ingestion.parsers.neuroscan.NeuroScanParser import NeuroScanParser
from ingestion.parsers.promoterdb.PromoterDBParser import PromoterDBParser


class DataExporter:
    def __init__(self, neuroscan: NeuroScanParser, promoter_db: PromoterDBParser):
        self.neuroscan = neuroscan
        self.promoter_db = promoter_db

    def export_all(self, output_dir):
        _export_to_csv(self.neuroscan.get_all_neurons(), f'{output_dir}/neurons.csv')
        _export_to_csv(self.neuroscan.get_all_synapses(), f'{output_dir}/synapses.csv')
        _export_to_csv(self.neuroscan.get_all_contacts(), f'{output_dir}/contacts.csv')
        _export_to_csv(self.promoter_db.get_promoters(), f'{output_dir}/promoters.csv')

        self._export_cphate_per_timepoint(f'{output_dir}/cphate')

    def _export_cphate_per_timepoint(self, output_dir_prefix: str):
        all_cphate_data = self.neuroscan.get_all_cphate_per_timepoint()
        for timepoint, cphate_data in all_cphate_data.items():
            filename = f'{output_dir_prefix}_{timepoint}.json'
            _export_to_json(cphate_data, filename)


def _export_to_csv(data: Dict[str, Any], filename: str):
    with open(filename, 'w', newline='') as csvfile:
        fieldnames = list(data.values())[0].__dict__.keys()
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        writer.writeheader()
        for item in data.values():
            item_dict = item.__dict__.copy()
            for key, value in item_dict.items():
                if isinstance(value, list):
                    item_dict[key] = json.dumps(value)

            writer.writerow(item_dict)


def _export_to_json(data: List[CphateClusterIteration], filename: str):
    with open(filename, 'w') as outfile:
        serializable_data = [obj.__dict__ for obj in data]
        json.dump(serializable_data, outfile, indent=2)

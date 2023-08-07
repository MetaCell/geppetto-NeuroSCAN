import os
import re
import pandas as pd

from ingestion.validation.regex import get_neuron_regex
from ingestion.validation.settings import NEURONS, CPHATE_XLS


class ValidationContext:
    def __init__(self, timepoint_path):
        self.timepoint_path = timepoint_path
        self.valid_neurons = set()
        self.cphate_columns = set()
        self.cphate_cell_values = set()
        self._populate_valid_neurons()
        self._populate_cphate_data()

    def _populate_valid_neurons(self):
        neuron_pattern = get_neuron_regex()
        neuron_path = os.path.join(self.timepoint_path, NEURONS)
        for filename in os.listdir(neuron_path):
            match = re.match(neuron_pattern, filename)
            if match:
                self.valid_neurons.add(match.group(1))

    def _populate_cphate_data(self):
        cphate_xls_path = os.path.join(self.timepoint_path, CPHATE_XLS)
        if os.path.exists(cphate_xls_path):
            df = pd.read_excel(cphate_xls_path)
            self.cphate_columns = set(df.columns)
            self.cphate_cell_values = set(df.values.flatten())


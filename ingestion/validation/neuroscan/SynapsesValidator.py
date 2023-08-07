import os
import re

from ingestion.validation.regex import get_synapse_folder_regex, get_synapse_regex
from ingestion.validation.settings import SYNAPSES


class SynapsesValidator:
    def __init__(self, validation_context):
        self.context = validation_context
        self.issues = []

    def validate(self):
        self._validate_synapses()
        return self.issues

    def _validate_synapses(self):
        synapse_folder_pattern = get_synapse_folder_regex()
        synapse_file_pattern = get_synapse_regex()

        synapses_path = os.path.join(self.context.timepoint_path, SYNAPSES)
        for synapse_folder in os.listdir(synapses_path):
            folder_match = re.match(synapse_folder_pattern, synapse_folder)
            if folder_match:
                neuron_name = folder_match.group(1)
                if neuron_name not in self.context.valid_neurons:
                    self.issues.append(f"Invalid neuron name in synapse folder: {neuron_name} in {synapse_folder}")

                synapse_folder_path = os.path.join(synapses_path, synapse_folder)
                for filename in os.listdir(synapse_folder_path):
                    file_match = re.match(synapse_file_pattern, filename)
                    if not file_match:
                        self.issues.append(f"Invalid synapse filename: {filename} in {synapse_folder_path}")
                        continue

                    source_neuron = file_match.group(1)
                    dest_neurons = file_match.group(3).split("&")
                    if source_neuron not in self.context.valid_neurons:
                        self.issues.append(
                            f"Invalid source neuron name in synapse filename: {source_neuron} in {filename}")

                    for dest_neuron in dest_neurons:
                        if dest_neuron not in self.context.valid_neurons:
                            self.issues.append(
                                f"Invalid destination neuron name in synapse filename: {dest_neuron} in {filename}")
            else:
                self.issues.append(f"Invalid synapse folder name: {synapse_folder} in {synapses_path}")

import os
import re

from ingestion.parsers.neuroscan.ParsingContext import ParsingContext
from ingestion.parsers.neuroscan.models import Synapse
from ingestion.parsers.regex import get_synapse_folder_regex_components, get_synapse_regex_components, \
    get_mismatch_reason


class SynapsesParser:
    def __init__(self, synapses_path: str, dev_stage: str, context: ParsingContext):
        self.synapses_path = synapses_path
        self.dev_stage = dev_stage
        self.context = context

    def parse(self):
        synapse_folder_pattern, _, _ = get_synapse_folder_regex_components()
        synapse_file_pattern, components, descriptions = get_synapse_regex_components()

        for synapse_folder in os.listdir(self.synapses_path):
            folder_match = re.match(synapse_folder_pattern, synapse_folder)
            if folder_match:
                neuron_name = folder_match.group(1)
                if neuron_name not in self.context.neurons:
                    self.context.synapse_issues.append(
                        f"Invalid neuron name in synapse folder: {neuron_name} in {synapse_folder}")

                synapse_folder_path = os.path.join(self.synapses_path, synapse_folder)
                for filename in os.listdir(synapse_folder_path):
                    file_match = re.match(synapse_file_pattern, filename)
                    if not file_match:
                        self.context.synapse_issues.append(get_mismatch_reason(filename, components, descriptions))
                        continue

                    source_neuron = file_match.group(1)
                    dest_neurons = file_match.group(3).split("&")
                    if source_neuron not in self.context.neurons:
                        self.context.synapse_issues.append(
                            f"Invalid source neuron name in synapse filename: {source_neuron} in {filename}")
                        continue

                    for dest_neuron in dest_neurons:
                        if dest_neuron not in self.context.neurons:
                            self.context.synapse_issues.append(
                                f"Invalid destination neuron name in synapse filename: {dest_neuron} in {filename}")
                        else:
                            self.update_or_create_synapse(source_neuron, dest_neuron, file_match.group(2))

            else:
                self.context.synapse_issues.append(f"Invalid synapse folder name: {synapse_folder}")

    def update_or_create_synapse(self, source: str, destination: str, connection_type: str, filename: str = None):
        name = get_synapse_name(source, destination, connection_type)
        if name in self.context.synapses:
            synapse = self.context.synapses[name]
            synapse.files.append(filename)
            synapse.stages.add(self.dev_stage)
        else:
            self.context.synapses[name] = Synapse(
                name=name,
                pre=source,
                post=destination,
                synapse_type=connection_type,
                stages={self.dev_stage},
                files=[filename],
                metadata='',
            )


def get_synapse_name(source, destination, connection_type):
    return f"{source}-{destination}-{connection_type}"

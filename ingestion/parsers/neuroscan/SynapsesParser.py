import os
import re
from typing import List

from ingestion.parsers.models import TimepointContext, Issue, Severity
from ingestion.parsers.neuroscan.models import Synapse
from ingestion.parsers.regex import get_synapse_folder_regex_components, get_synapse_regex_components, \
    get_mismatch_reason
from ingestion.settings import SYNAPSE_PRE_POSITION_TYPE, SYNAPSE_POST_POSITION_TYPE


class SynapsesParser:
    def __init__(self, synapses_path: str, timepoint: str, context: TimepointContext):
        self.synapses_path = synapses_path

        if not os.path.exists(self.synapses_path):
            raise FileNotFoundError

        self.timepoint = timepoint
        self.timepoint_context = context
        self.issues: List[Issue] = []

    def parse(self):
        synapse_folder_pattern, synapse_folder_regex_components, \
        synapse_folder_regex_descriptions = get_synapse_folder_regex_components()
        synapse_file_pattern, synapse_file_regex_components, \
        synapse_file_regex_descriptions = get_synapse_regex_components()

        for synapse_folder in os.listdir(self.synapses_path):
            synapse_folder_full_path = os.path.join(self.synapses_path, synapse_folder)
            if not os.path.isdir(synapse_folder_full_path):
                self.issues.append(Issue(Severity.WARNING, f"{self.synapses_path}{synapse_folder} is not a directory"))
                continue

            folder_match = re.match(synapse_folder_pattern, synapse_folder)

            if folder_match:
                neuron_name = folder_match.group(1)
                position_type = folder_match.group(2)
                if neuron_name not in self.timepoint_context.neurons:
                    self.issues.append(Issue(Severity.ERROR,
                                             f"Invalid neuron name in synapse folder: "
                                             f"{neuron_name} in {synapse_folder}"))

                synapse_folder_path = os.path.join(self.synapses_path, synapse_folder)
                for filename in os.listdir(synapse_folder_path):
                    file_match = re.match(synapse_file_pattern, filename)
                    if not file_match:
                        self.issues.append(
                            Issue(Severity.ERROR,
                                  get_mismatch_reason(filename, synapse_file_regex_components,
                                                      synapse_file_regex_descriptions, synapse_folder_path)))
                        continue

                    source_neuron = file_match.group(1)
                    connection_type = file_match.group(2)
                    dest_neurons = file_match.group(3).split("&")
                    synapse_id = file_match.group(4)

                    if not is_valid_neuron_for_connection(neuron_name, source_neuron, position_type, dest_neurons):
                        self.issues.append(Issue(Severity.ERROR,
                                                 f"Neuron {neuron_name} seems to be in the incorrect folder "
                                                 f"{source_neuron}"))
                        continue

                    if source_neuron not in self.timepoint_context.neurons:
                        self.issues.append(Issue(Severity.ERROR,
                                                 f"Invalid source neuron name in synapse filename: "
                                                 f"{source_neuron} in {filename}"))
                        continue

                    for dest_neuron in dest_neurons:
                        if dest_neuron not in self.timepoint_context.neurons:
                            self.issues.append(Issue(Severity.ERROR,
                                                     f"Invalid destination neuron name {dest_neuron}"
                                                     f" in synapse filename: {filename}"))
                        else:
                            self.create_synapse(source_neuron, dest_neuron, connection_type, synapse_id, filename)

            else:
                self.issues.append(
                    Issue(Severity.ERROR,
                          get_mismatch_reason(synapse_folder, synapse_folder_regex_components,
                                              synapse_folder_regex_descriptions)))

    def create_synapse(self, source: str, destination: str, connection_type: str, synapse_id: str,
                       filename: str = None):
        name = get_synapse_name(source, destination, connection_type, synapse_id)
        if name in self.timepoint_context.synapses:
            old_synapse = self.timepoint_context.synapses[name]
            self.issues.append(Issue(Severity.WARNING, f"Duplicate synapse name: {name}. {filename} replaced "
                                                       f"{old_synapse.files[0]}"))

            self.timepoint_context.synapses[name] = Synapse(
                name=name,
                pre=source,
                post=destination,
                synapse_type=connection_type,
                stages={self.timepoint},
                files=[filename],
                metadata='',
            )

    def get_issues(self):
        return self.issues


def get_synapse_name(source, destination, connection_type, synapse_id):
    return f"{source}-{destination}-{connection_type}-{synapse_id}"


def is_valid_neuron_for_connection(neuron_name: str, source_neuron: str, position_type: str,
                                   dest_neurons: List[str]) -> bool:
    position_type = position_type.lower()
    if position_type == SYNAPSE_PRE_POSITION_TYPE.lower():
        return neuron_name == source_neuron
    elif position_type == SYNAPSE_POST_POSITION_TYPE.lower():
        return neuron_name in dest_neurons

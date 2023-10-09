import os
import re
from typing import List

from ingestion.parsers.models import TimepointContext, Issue, Severity, Synapse
from ingestion.parsers.regex import get_synapse_regex_components, \
    get_mismatch_reason
from ingestion.settings import SYNAPSE_POST_POSITION_TYPE


class SynapsesParser:
    def __init__(self, synapses_path: str, timepoint: str, context: TimepointContext):
        self.synapses_path = synapses_path

        if not os.path.exists(self.synapses_path):
            raise FileNotFoundError

        self.timepoint = timepoint
        self.timepoint_context = context
        self.issues: List[Issue] = []

    def parse(self):
        synapse_file_pattern, synapse_file_regex_components, \
        synapse_file_regex_descriptions = get_synapse_regex_components()

        for filename in os.listdir(self.synapses_path):
            file_match = re.match(synapse_file_pattern, filename)
            if not file_match:
                self.issues.append(
                    Issue(Severity.WARNING,
                          get_mismatch_reason(filename, synapse_file_regex_components,
                                              synapse_file_regex_descriptions, self.synapses_path)))
                continue

            source_neuron = file_match.group(1)
            connection_type = file_match.group(2)
            dest_neurons = file_match.group(3).split("_")
            section = file_match.group(4)
            position = file_match.group(5)
            neuron_site = ''

            if source_neuron not in self.timepoint_context.neurons:
                self.issues.append(Issue(Severity.WARNING,
                                         f"Invalid source neuron name in synapse filename: "
                                         f"{source_neuron} in {filename}"))
                continue

            for dest_neuron in dest_neurons:
                if dest_neuron not in self.timepoint_context.neurons:
                    self.issues.append(Issue(Severity.WARNING,
                                             f"Invalid destination neuron name {dest_neuron}"
                                             f" in synapse filename: {filename}"))

            post_neuron = None
            if SYNAPSE_POST_POSITION_TYPE.lower() in position.lower():
                try:
                    neuron_site = int(re.search(r"(\d+)", position).group(1))
                except ValueError:
                    self.issues.append(
                        Issue(Severity.WARNING, f"Neuron site: {neuron_site} is not a number"))

                if neuron_site and len(dest_neurons) >= neuron_site > 0:
                    post_neuron = dest_neurons[neuron_site - 1]
                else:
                    self.issues.append(Issue(Severity.WARNING, f"Invalid neuron site: {neuron_site}"))

            self.create_synapse(source_neuron, dest_neurons, post_neuron,
                                connection_type, section, position, neuron_site, filename)

    def create_synapse(self, neuron_pre: str, neurons_post: List[str], post_neuron: str, connection_type: str,
                       section: str, position: str, neuron_site: str, filename: str = None):

        name, _ = os.path.splitext(filename)

        if name in self.timepoint_context.synapses:
            old_synapse = self.timepoint_context.synapses[name]
            self.issues.append(Issue(Severity.WARNING, f"Duplicate synapse name: {name}. {filename} replaced "
                                                       f"{old_synapse.filename}"))
        self.timepoint_context.synapses[name] = Synapse(
            type=connection_type,
            name=name,
            timepoint=self.timepoint,
            metadata='',
            section=section,
            neuronPre=neuron_pre,
            neuronPost=neurons_post,
            filename=filename,
            position=position,
            zs='',
            neuronSite=neuron_site,
            postNeuron=post_neuron,
            uid=name

        )

    def get_issues(self):
        return self.issues

    def get_synapse_uid(self, name):
        return f"{name}-{self.timepoint}"

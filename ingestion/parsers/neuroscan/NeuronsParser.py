import os
import re

from ingestion.parsers.neuroscan.ParsingContext import ParsingContext
from ingestion.parsers.neuroscan.models import Neuron
from ingestion.parsers.regex import get_neuron_regex_components, get_mismatch_reason


class NeuronsParser:
    def __init__(self, neurons_path: str, dev_stage: str, context: ParsingContext):
        self.neurons_path: str = neurons_path
        self.dev_stage = dev_stage
        self.context = context

    def parse(self):
        neuron_pattern, components, descriptions = get_neuron_regex_components()
        for filename in os.listdir(self.neurons_path):
            match = re.match(neuron_pattern, filename)
            if not match:
                self.context.contact_issues.append(get_mismatch_reason(filename, components, descriptions))
            else:
                self.update_or_create_neuron(match.group(1), filename)

    def update_or_create_neuron(self, name: str, filename: str):
        # todo: Promoter Parser needs to update neurons lineage and location
        # todo: Fetch data from wormatlas

        if name in self.context.neurons:
            neuron = self.context.neurons[name]
            neuron.files.append(filename)
            neuron.timepoints.add(self.dev_stage)
        else:
            self.context.neurons[name] = Neuron(name=name, files=[filename], timepoints={self.dev_stage}, location='',
                                                lineage='', metadata='', wormatlas='')

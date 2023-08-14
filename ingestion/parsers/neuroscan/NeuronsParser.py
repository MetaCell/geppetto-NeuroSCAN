import os
import re
from typing import List

from ingestion.parsers.models import TimepointContext, Issue, Severity
from ingestion.parsers.neuroscan.models import Neuron
from ingestion.parsers.regex import get_neuron_regex_components, get_mismatch_reason


class NeuronsParser:
    def __init__(self, neurons_path: str, timepoint: str, timepoint_context: TimepointContext):
        self.neurons_path: str = neurons_path

        if not os.path.exists(self.neurons_path):
            raise FileNotFoundError

        self.timepoint = timepoint
        self.timepoint_context = timepoint_context
        self.issues: List[Issue] = []

    def parse(self):
        neuron_pattern, components, descriptions = get_neuron_regex_components()
        for filename in os.listdir(self.neurons_path):
            match = re.match(neuron_pattern, filename)
            if not match:
                self.issues.append(
                    Issue(Severity.ERROR, get_mismatch_reason(filename, components, descriptions, self.neurons_path)))
            else:
                self.create_neuron(match.group(1), filename)

    def create_neuron(self, name: str, filename: str):
        # fixme: Promoter Parser needs to update neurons lineage and location. It is missing from the client's files
        # todo: Fetch data from wormatlas

        if name in self.timepoint_context.neurons:
            old_neuron = self.timepoint_context.neurons[name]
            self.issues.append(Issue(Severity.WARNING,
                                     f"Duplicated neuron {name} on timepoint {self.timepoint}. {filename} replaced "
                                     f"{old_neuron.file}"))

        self.timepoint_context.neurons[name] = Neuron(name=name, file=filename, timepoints={self.timepoint},
                                                      location='', lineage='', metadata='', wormatlas='')

    def get_issues(self):
        return self.issues

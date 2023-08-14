import os
import re
from typing import List, Dict

from ingestion.parsers.models import TimepointContext, Issue, Severity
from ingestion.parsers.neuroscan.models import Neuron
from ingestion.parsers.regex import get_neuron_regex_components, get_mismatch_reason


class NeuronsParser:
    def __init__(self, neurons_path: str, timepoint: str, wormatlas_dict: Dict[str, str],
                 timepoint_context: TimepointContext):
        self.neurons_path: str = neurons_path

        if not os.path.exists(self.neurons_path):
            raise FileNotFoundError

        self.timepoint = timepoint
        self.wormatlas_dict = wormatlas_dict
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

        if name in self.timepoint_context.neurons:
            old_neuron = self.timepoint_context.neurons[name]
            self.issues.append(Issue(Severity.WARNING,
                                     f"Duplicated neuron {name} on timepoint {self.timepoint}. {filename} replaced "
                                     f"{old_neuron.filename}"))

        wormatlas_url = self.wormatlas_dict.get(name, '')
        if wormatlas_url == '':
            self.issues.append(Issue(Severity.WARNING, f"Wormatlas url not found for {name}"))
        self.timepoint_context.neurons[name] = Neuron(uid=self.get_neuron_uid(name), name=name, filename=filename,
                                                      timepoint=self.timepoint, location='', lineage='', metadata='',
                                                      wormatlas=wormatlas_url, embryonic=False)

    def get_issues(self):
        return self.issues

    def get_neuron_uid(self, name):
        return f"{name}-{self.timepoint}"

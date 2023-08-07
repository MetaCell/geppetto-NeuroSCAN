import os
import re

from ingestion.validation.regex import get_neuron_regex
from ingestion.validation.settings import NEURONS


class NeuronsValidator:
    def __init__(self, validation_context):
        self.context = validation_context
        self.issues = []

    def validate(self):
        self._validate_neurons()
        return self.issues

    def _validate_neurons(self):
        neuron_pattern = get_neuron_regex()
        neuron_path = os.path.join(self.context.timepoint_path, NEURONS)
        for filename in os.listdir(neuron_path):
            match = re.match(neuron_pattern, filename)
            if not match:
                self.issues.append(f"Invalid neuron filename: {filename} in {neuron_path}")
            if not match.group(1) in self.context.valid_neurons:
                self.issues.append(f"Invalid neuron: {match.group(1)} in {neuron_path}")

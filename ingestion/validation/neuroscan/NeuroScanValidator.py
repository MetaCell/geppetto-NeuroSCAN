import os
import re
from collections import defaultdict

from ingestion.validation.neuroscan.ContactsValidator import ContactsValidator
from ingestion.validation.neuroscan.CphateValidator import CphateValidator
from ingestion.validation.neuroscan.NeuronsValidator import NeuronsValidator
from ingestion.validation.neuroscan.SynapsesValidator import SynapsesValidator
from ingestion.validation.neuroscan.ValidationContext import ValidationContext
from ingestion.validation.regex import get_neuron_regex
from ingestion.validation.settings import NEUROSCAN_EXPECTED_FOLDERS_IN_TIMEPOINT, NEURONS


class NeuroScanValidator:
    def __init__(self, app_path):
        self.app_path = app_path
        self.valid_neurons = set()
        self.issues = defaultdict(list)

    def validate(self):
        self._validate_folder_structure()
        self._populate_valid_neurons()
        for dev_stage in os.listdir(self.app_path):
            dev_stage_path = os.path.join(self.app_path, dev_stage)
            for timepoint in os.listdir(dev_stage_path):
                timepoint_path = os.path.join(dev_stage_path, timepoint)
                validation_context = ValidationContext(timepoint_path)

                self.issues['neurons'].extend(NeuronsValidator(validation_context).validate())
                self.issues['synapses'].extend(SynapsesValidator(validation_context).validate())
                self.issues['contacts'].extend(ContactsValidator(validation_context).validate())
                self.issues['cphate'].extend(CphateValidator(validation_context).validate())
        return self.issues

    def _validate_folder_structure(self):
        for dev_stage in os.listdir(self.app_path):
            dev_stage_path = os.path.join(self.app_path, dev_stage)
            if os.path.isdir(dev_stage_path):
                for timepoint in os.listdir(dev_stage_path):
                    timepoint_path = os.path.join(dev_stage_path, timepoint)
                    if os.path.isdir(timepoint_path):
                        for folder in NEUROSCAN_EXPECTED_FOLDERS_IN_TIMEPOINT:
                            if folder not in os.listdir(timepoint_path):
                                self.issues.append(f"Missing {folder} folder in {timepoint_path}")
                    else:
                        self.issues.append(f"Invalid TimePoint folder: {timepoint_path}")
            else:
                self.issues.append(f"Invalid Development Stage folder: {dev_stage_path}")

    def _populate_valid_neurons(self):
        neuron_pattern = get_neuron_regex()
        for dev_stage in os.listdir(self.app_path):
            dev_stage_path = os.path.join(self.app_path, dev_stage)
            for timepoint in os.listdir(dev_stage_path):
                neuron_path = os.path.join(dev_stage_path, timepoint, NEURONS)
                for filename in os.listdir(neuron_path):
                    match = re.match(neuron_pattern, filename)
                    if match:
                        self.valid_neurons.add(match.group(1))

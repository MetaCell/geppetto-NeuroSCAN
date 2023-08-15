import os
from typing import Dict, List, Union, Tuple, Any

import pandas as pd

from ingestion.parsers.models import TimepointContext, NeuroScanIssues, Issue, Severity
from ingestion.parsers.neuroscan.ContactsParser import ContactsParser
from ingestion.parsers.neuroscan.CphateParser import CphateParser
from ingestion.parsers.neuroscan.NeuronsParser import NeuronsParser
from ingestion.parsers.neuroscan.SynapsesParser import SynapsesParser
from ingestion.parsers.neuroscan.models import Neuron, Synapse, Contact, CphateClusterIteration
from ingestion.settings import NEUROSCAN_APP, NEURONS_FOLDER, SYNAPSES_FOLDER, CONTACTS_FOLDER, CONTACTS_XLS, \
    CPHATE_FOLDER, CPHATE_XLS, WORMATLAS_CSV, WORMATLAS_NEURON_COL, WORMATLAS_URL_COL


class NeuroScanParser:
    def __init__(self, root_dir):
        self.app_path = os.path.join(root_dir, NEUROSCAN_APP)
        if not os.path.exists(self.app_path):
            raise FileNotFoundError

        self.wormatlas_dict = load_wormatlas_data()
        self.context_per_timepoint = {}
        self.issues = NeuroScanIssues()

    def parse(self):
        for dev_stage in os.listdir(self.app_path):
            dev_stage_path = os.path.join(self.app_path, dev_stage)
            if not os.path.isdir(dev_stage_path):
                self.issues.general.append(Issue(Severity.WARNING, f"{dev_stage_path} is not a directory"))
                continue
            for timepoint in os.listdir(dev_stage_path):
                timepoint_path = os.path.join(self.app_path, dev_stage, timepoint)
                if not os.path.isdir(timepoint_path):
                    self.issues.general.append(Issue(Severity.WARNING, f"{timepoint_path} is not a directory"))
                    continue

                timepoint_context = TimepointContext(timepoint=timepoint)

                self.parse_neurons(timepoint_path, timepoint, timepoint_context)
                self.parse_synapses(timepoint_path, timepoint, timepoint_context)
                self.parse_contacts(timepoint_path, timepoint, timepoint_context)
                self.parse_cphates(timepoint_path, timepoint, timepoint_context)

                self.context_per_timepoint[timepoint] = timepoint_context

    def parse_neurons(self, timepoint_path, timepoint, context):
        neurons_path = os.path.join(timepoint_path, NEURONS_FOLDER)
        try:
            neurons_parser = NeuronsParser(neurons_path, timepoint, self.wormatlas_dict, context)
        except FileNotFoundError:
            self.issues.general.append(Issue(Severity.ERROR, f"Neurons folder {neurons_path} not found"))
            return

        neurons_parser.parse()
        self.issues.neurons.extend(neurons_parser.get_issues())

    def parse_synapses(self, timepoint_path, timepoint, context):
        synapses_path = os.path.join(timepoint_path, SYNAPSES_FOLDER)
        try:
            synapses_parser = SynapsesParser(synapses_path, timepoint, context)
        except FileNotFoundError:
            self.issues.general.append(Issue(Severity.ERROR, f"Synapses folder {synapses_path} not found"))
            return

        synapses_parser.parse()
        self.issues.synapses.extend(synapses_parser.get_issues())

    def parse_contacts(self, timepoint_path, timepoint, context):

        contacts_path = os.path.join(timepoint_path, CONTACTS_FOLDER)
        contacts_xls = os.path.join(timepoint_path, CONTACTS_XLS)

        try:
            contacts_parser = ContactsParser(contacts_path, contacts_xls, timepoint, context)
        except FileNotFoundError as e:
            self.issues.general.append(Issue(Severity.ERROR, str(e)))
            return

        contacts_parser.parse()
        self.issues.contacts.extend(contacts_parser.get_issues())

    def parse_cphates(self, timepoint_path, timepoint, context):
        cphate_path = os.path.join(timepoint_path, CPHATE_FOLDER)
        cphate_xls = os.path.join(timepoint_path, CPHATE_XLS)
        try:
            cphate_parser = CphateParser(cphate_path, cphate_xls, timepoint, context)
        except FileNotFoundError as e:
            self.issues.general.append(Issue(Severity.ERROR, str(e)))
            return
        cphate_parser.parse()
        self.issues.cphate.extend(cphate_parser.get_issues())

    def get_issues(self):
        return self.issues

    def get_context_per_timepoint(self):
        return self.context_per_timepoint

    def get_all_entities_for_attribute(self, attribute_name: str) -> Dict[str, Any]:
        all_entities = {}
        for timepoint, context in self.context_per_timepoint.items():
            entities = getattr(context, attribute_name, {})
            for entity_name, entity in entities.items():
                all_entities[f"{entity.name}-{entity.timepoint}"] = entity
        return all_entities

    def get_all_neurons(self) -> Dict[str, Neuron]:
        return self.get_all_entities_for_attribute("neurons")

    def get_all_synapses(self) -> Dict[str, Synapse]:
        return self.get_all_entities_for_attribute("synapses")

    def get_all_contacts(self) -> Dict[str, Contact]:
        return self.get_all_entities_for_attribute("contacts")

    def get_all_cphate_per_timepoint(self) -> Dict[str, List[CphateClusterIteration]]:
        cphate_by_timepoint = {}
        for timepoint, context in self.context_per_timepoint.items():
            cphate_by_timepoint[timepoint] = list(context.cphate.values())
        return cphate_by_timepoint

    def get_all_timepoints(self):
        return self.context_per_timepoint.keys()


def load_wormatlas_data():
    current_directory = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(current_directory, WORMATLAS_CSV)

    df = pd.read_csv(csv_path)
    wormatlas_dict = {row[WORMATLAS_NEURON_COL]: row[WORMATLAS_URL_COL] for _, row in df.iterrows()}

    return wormatlas_dict

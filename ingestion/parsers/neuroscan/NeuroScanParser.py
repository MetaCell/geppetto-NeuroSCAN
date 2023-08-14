import os

from ingestion.parsers.models import TimepointContext, NeuroScanIssues, Issue, Severity
from ingestion.parsers.neuroscan.ContactsParser import ContactsParser
from ingestion.parsers.neuroscan.NeuronsParser import NeuronsParser
from ingestion.parsers.neuroscan.SynapsesParser import SynapsesParser
from ingestion.settings import NEUROSCAN_APP, NEURONS_FOLDER, SYNAPSES_FOLDER, CONTACTS_FOLDER, CONTACTS_XLS


class NeuroScanParser:
    def __init__(self, root_dir):
        self.app_path = os.path.join(root_dir, NEUROSCAN_APP)
        if not os.path.exists(self.app_path):
            raise FileNotFoundError
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

                self.context_per_timepoint[timepoint] = timepoint_context
            else:
                self.issues.general.append(Issue(Severity.WARNING, f"No timepoints found for dev stage {dev_stage}"))
        else:
            self.issues.general.append(Issue(Severity.WARNING, f"No dev stages found"))

    def parse_neurons(self, timepoint_path, timepoint, context):
        neurons_path = os.path.join(timepoint_path, NEURONS_FOLDER)
        try:
            neurons_parser = NeuronsParser(neurons_path, timepoint, context)
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

    def get_issues(self):
        return self.issues
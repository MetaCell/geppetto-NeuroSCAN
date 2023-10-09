import os
import re
from typing import List

import pandas as pd

from ingestion.parsers.models import Issue, Severity, Contact
from ingestion.parsers.regex import get_contact_regex_components, get_mismatch_reason
from ingestion.settings import CONTACTS_XLS_NEURON_A_COL, CONTACTS_XLS_NEURON_B_COL, CONTACTS_XLS_WEIGHT_COL, \
    CONTACTS_XLS


class ContactsParser:
    def __init__(self, contacts_path, spreadsheet_path, timepoint, context):
        self.contacts_path = contacts_path

        if not os.path.exists(contacts_path):
            raise FileNotFoundError(f"Folder {contacts_path} not found")

        self.spreadsheet_path = spreadsheet_path

        if not os.path.exists(spreadsheet_path):
            raise FileNotFoundError(f"File {spreadsheet_path} not found")

        self.timepoint = timepoint
        self.timepoint_context = context
        self.contact_info_from_spreadsheet = {}
        self.issues: List[Issue] = []

    def parse(self):
        csv_parsed_successfully = self.parse_csv()
        if not csv_parsed_successfully:
            return
        self.parse_filesystem()

    def parse_csv(self) -> bool:
        df = pd.read_excel(self.spreadsheet_path)

        necessary_columns = [CONTACTS_XLS_NEURON_A_COL, CONTACTS_XLS_NEURON_B_COL, CONTACTS_XLS_WEIGHT_COL]
        missing_columns = [col for col in necessary_columns if col not in df.columns]
        if missing_columns:
            for col in missing_columns:
                self.issues.append(
                    Issue(Severity.ERROR, f"Column {col} is missing in the contacts spreadsheet"))
            return False

        for _, row in df.iterrows():
            neuron_a = row[CONTACTS_XLS_NEURON_A_COL]
            neuron_b = row[CONTACTS_XLS_NEURON_B_COL]
            weight = row[CONTACTS_XLS_WEIGHT_COL]

            name = get_contact_name(neuron_a, neuron_b)
            self.contact_info_from_spreadsheet[name] = weight

        return True

    def parse_filesystem(self):
        contact_file_pattern, components, descriptions = get_contact_regex_components()
        for filename in os.listdir(self.contacts_path):
            match = re.match(contact_file_pattern, filename)
            if not match:
                self.issues.append(Issue(Severity.WARNING, get_mismatch_reason(filename, components, descriptions)))
                continue
            neuron_a = match.group(1)
            neuron_b = match.group(2)
            if neuron_a not in self.timepoint_context.neurons:
                self.issues.append(Issue(Severity.WARNING,
                                         f"Invalid mention to neuron {neuron_a} in {self.contacts_path}"))
                continue
            if neuron_b not in self.timepoint_context.neurons:
                self.issues.append(Issue(Severity.WARNING,
                                         f"Invalid mention to neuron {neuron_b} in {self.contacts_path}"))
                continue

            name = get_contact_name(neuron_a, neuron_b)
            if name in self.contact_info_from_spreadsheet:
                self.create_contact(neuron_a, neuron_b, self.contact_info_from_spreadsheet[name], filename)
            else:
                self.issues.append(Issue(Severity.WARNING,
                                         f"Contact {name} in {filename} not found in {CONTACTS_XLS}"))

    def create_contact(self, neuron_a: str, neuron_b: str, weight: int, filename: str):
        name = get_contact_name(neuron_a, neuron_b)
        if name in self.timepoint_context.contacts:
            old_contact = self.timepoint_context.synapses[name]
            self.issues.append(Issue(Severity.WARNING, f"Duplicate contact name: {name}. {filename} replaced "
                                                       f"{old_contact.filename}"))

        self.timepoint_context.contacts[name] = Contact(name=name, neuronA=neuron_a, neuronB=neuron_b,
                                                        timepoint=self.timepoint, filename=filename, weight=weight,
                                                        metadata='', uid=name)

    def get_issues(self):
        return self.issues

    def get_contact_uid(self, name):
        return f"{name}-{self.timepoint}"


def get_contact_name(neuron_a, neuron_b):
    return f"{neuron_a}-{neuron_b}"

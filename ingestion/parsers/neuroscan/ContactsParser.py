import os
import re

import pandas as pd

from ingestion.parsers.neuroscan.models import Contact
from ingestion.parsers.regex import get_contact_regex_components, get_mismatch_reason
from ingestion.settings import CONTACTS_XLS_NEURON_A_COL, CONTACTS_XLS_NEURON_B_COL, CONTACTS_XLS_WEIGHT_COL, \
    CONTACTS_XLS


class ContactsParser:
    def __init__(self, contacts_path, spreadsheet_path, dev_stage, context):
        self.contacts_path = contacts_path
        self.spreadsheet_path = spreadsheet_path
        self.dev_stage = dev_stage
        self.context = context
        self.contact_info_from_spreadsheet = {}

    def parse(self):
        self.parse_csv()
        self.parse_filesystem()

    def parse_csv(self):
        df = pd.read_csv(self.spreadsheet_path)

        for _, row in df.iterrows():
            neuron_a = row[CONTACTS_XLS_NEURON_A_COL]
            neuron_b = row[CONTACTS_XLS_NEURON_B_COL]
            weight = row[CONTACTS_XLS_WEIGHT_COL]

            name = get_contact_name(neuron_a, neuron_b)
            self.contact_info_from_spreadsheet[name] = weight

    def parse_filesystem(self):
        contact_file_pattern, components, descriptions = get_contact_regex_components()
        for filename in os.listdir(self.contacts_path):
            match = re.match(contact_file_pattern, filename)
            if not match:
                self.context.contact_issues.append(get_mismatch_reason(filename, components, descriptions))
                continue
            neuron_a = match.group(1)
            neuron_b = match.group(2)
            if neuron_a not in self.context.neurons:
                self.context.contact_issues.append(
                    f"Invalid mention to neuron {neuron_a} in {self.contacts_path}")
                continue
            if neuron_b not in self.context.neurons:
                self.context.contact_issues.append(
                    f"Invalid mention to neuron {neuron_b} in {self.contacts_path}")
                continue

            name = get_contact_name(neuron_a, neuron_b)
            if name in self.contact_info_from_spreadsheet:
                self.update_or_create_contact(neuron_a, neuron_b, self.contact_info_from_spreadsheet[name], filename)
            else:
                self.context.contact_issues.append(f"Contact {name} in {filename} not found in {CONTACTS_XLS}")

    def update_or_create_contact(self, neuron_a: str, neuron_b: str, weight: int, filename: str):
        name = get_contact_name(neuron_a, neuron_b)
        if name in self.context.contacts:
            contact = self.context.contacts[name]
            contact.files.append(filename)
            contact.stages.add(self.dev_stage)
            contact.weight = weight
        else:
            self.context.contacts[name] = Contact(name=name, neuronA=neuron_a, neuronB=neuron_b,
                                                  stages={self.dev_stage}, files=[filename], weight=weight, metadata='')


def get_contact_name(neuron_a, neuron_b):
    return f"{neuron_a}-{neuron_b}"

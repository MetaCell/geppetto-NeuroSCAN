import os
import re

from ingestion.parsers.neuroscan.models import Contact
from ingestion.parsers.regex import get_contact_regex_components, get_mismatch_reason


class ContactsParser:
    def __init__(self, contacts_path, dev_stage, context):
        self.contacts_path = contacts_path
        self.dev_stage = dev_stage
        self.context = context

    def parse(self):
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
            self.update_or_create_contact(neuron_a, neuron_b, filename)

    def update_or_create_contact(self, neuron_a: str, neuron_b: str, filename: str):
        # todo: Read xls
        name = get_contact_name(neuron_a, neuron_b)
        if name in self.context.contacts:
            contact = self.context.contacts[name]
            contact.files.append(filename)
            contact.stages.add(self.dev_stage)
        else:
            self.context.contacts[name] = Contact(name=name, neuronA=neuron_a, neuronB=neuron_b,
                                                  stages={self.dev_stage}, files=[filename], weight=0.0, metadata='')


def get_contact_name(neuron_a, neuron_b):
    return f"{neuron_a}-{neuron_b}"

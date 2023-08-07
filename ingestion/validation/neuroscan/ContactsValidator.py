import os
import re

from ingestion.validation.regex import get_contact_regex


class ContactsValidator:
    def __init__(self, validation_context):
        self.context = validation_context
        self.issues = []

    def validate(self):
        self._validate_contacts()
        return self.issues

    def _validate_contacts(self):
        contact_file_pattern = get_contact_regex()
        contacts_path = os.path.join(self.context.timepoint_path, 'contacts')
        for filename in os.listdir(contacts_path):
            match = re.match(contact_file_pattern, filename)
            if not match:
                self.issues.append(f"Invalid contact filename: {filename} in {contacts_path}")
            if not match.group(1) in self.context.valid_neurons:
                self.issues.append(f"Invalid mention to neuron {match.group(1)} in {contacts_path}")
            if not match.group(2) in self.context.valid_neurons:
                self.issues.append(f"Invalid mention to neuron {match.group(2)} in {contacts_path}")

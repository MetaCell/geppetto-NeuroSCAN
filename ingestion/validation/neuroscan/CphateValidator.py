import os
import re

from ingestion.validation.regex import get_cphate_regex
from ingestion.validation.settings import CPHATE


class CphateValidator:
    def __init__(self, validation_context):
        self.context = validation_context
        self.issues = []

    def validate(self):
        self._validate_cphate_files()
        return self.issues

    def _validate_cphate_files(self):
        cphate_file_pattern = get_cphate_regex()
        cphate_path = os.path.join(self.context.timepoint_path, CPHATE)
        for filename in os.listdir(cphate_path):
            match = re.match(cphate_file_pattern, filename)
            if match:
                iteration_num = match.group(1)
                cluster_num = match.group(2)
                if f"Iteration{iteration_num}" not in self.context.cphate_columns:
                    self.issues.append(f"Invalid iteration number in cphate filename: {filename}")
                if int(cluster_num) not in self.context.cphate_cell_values:
                    self.issues.append(f"Invalid cluster number in cphate filename: {filename}")
            else:
                self.issues.append(f"Invalid cphate filename: {filename}")

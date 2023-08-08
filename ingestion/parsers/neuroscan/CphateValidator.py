import os
import re

import pandas as pd

from ingestion.validation.regex import get_cphate_regex, get_cphate_regex_components, check_pattern_components
from ingestion.validation.settings import CPHATE, CPHATE_ITERATION_COLUMN_PREFIX, CPHATE_XLS


class CphateValidator:
    def __init__(self, validation_context):
        self.context = validation_context
        self.issues = []

    def validate(self):
        self._validate_and_populate_context()
        return self.issues

    def _validate_and_populate_context(self):
        cphate_file_pattern, components, descriptions = get_cphate_regex_components()
        cphate_path = os.path.join(self.context.timepoint_path, CPHATE)
        for filename in os.listdir(cphate_path):
            match = re.match(cphate_file_pattern, filename)
            if match:
                iteration_num = match.group(1)
                cluster_num = match.group(2)
                self.context.cphate_columns.add(f"{CPHATE_ITERATION_COLUMN_PREFIX}{iteration_num}")
                self.context.cphate_cell_values.add(int(cluster_num))
            else:
                issues = check_pattern_components(filename, components, descriptions)
                self.issues.extend([f"{issue} in {cphate_path}" for issue in issues])

        # After populating, validate with xls data
        cphate_xls_path = os.path.join(self.context.timepoint_path, CPHATE_XLS)
        if os.path.exists(cphate_xls_path):
            df = pd.read_excel(cphate_xls_path)
            self.context.cphate_columns.symmetric_difference_update(set(df.columns))
            self.context.cphate_cell_values.symmetric_difference_update(set(df.values.flatten()))

            # We only want to report the differences, not the entire set
            if self.context.cphate_columns:
                self.issues.append(f"CPHATE XLS columns mismatch: {self.context.cphate_columns}")
            if self.context.cphate_cell_values:
                self.issues.append(f"CPHATE XLS values mismatch: {self.context.cphate_cell_values}")

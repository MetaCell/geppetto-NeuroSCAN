import os
import re
from typing import List

import pandas as pd

from ingestion.parsers.models import TimepointContext, Issue, Severity
from ingestion.parsers.neuroscan.models import CphateGroupIteration
from ingestion.parsers.regex import get_cphate_regex_components, get_mismatch_reason
from ingestion.settings import CPHATE_ITERATION_COLUMN_PREFIX, CPHATE_REQUIRED_COLUMN


class CphateParser:
    def __init__(self, cphate_path: str, spreadsheet_path: str, timepoint: str, timepoint_context: TimepointContext):
        self.cphate_path = cphate_path

        if not os.path.exists(cphate_path):
            raise FileNotFoundError(f"Folder {cphate_path} not found")

        self.spreadsheet_path = spreadsheet_path

        if not os.path.exists(spreadsheet_path):
            raise FileNotFoundError(f"File {spreadsheet_path} not found")

        self.timepoint = timepoint
        self.timepoint_context = timepoint_context
        self.issues: List[Issue] = []

        self.cphate_columns = set()
        self.cphate_cell_values = set()

    def parse(self):
        cphate_file_pattern, components, descriptions = get_cphate_regex_components()

        df = pd.read_csv(self.spreadsheet_path)

        headers = df.columns.tolist()
        if headers[0] != CPHATE_REQUIRED_COLUMN:
            self.issues.append(Issue(Severity.ERROR,
                                     f"First column in the spreadsheet should be {CPHATE_REQUIRED_COLUMN}. Found: {headers[0]}"))
            return

        for header in headers[1:]:
            if not header.startswith(CPHATE_ITERATION_COLUMN_PREFIX):
                self.issues.append(
                    Issue(Severity.ERROR, f"Column header {header} does not follow the required format."))
                return

        grouped_neuron_data = {}  # type: Dict[Tuple[int, int], List[str]]

        for _, row in df.iterrows():
            neuron_name = row[CPHATE_REQUIRED_COLUMN]

            if neuron_name not in self.timepoint_context.neurons:
                self.issues.append(Issue(Severity.ERROR, f"Neuron {neuron_name} not found in timepoint context."))
                continue

            for col_name, group_num in row.iteritems():
                if col_name.startswith(CPHATE_ITERATION_COLUMN_PREFIX):
                    iteration_num = int(col_name.replace(CPHATE_ITERATION_COLUMN_PREFIX, '').strip())
                    key = (iteration_num, int(group_num))
                    grouped_neuron_data.setdefault(key, []).append(neuron_name)

        for filename in os.listdir(self.cphate_path):
            match = re.match(cphate_file_pattern, filename)
            if match:
                iteration_num = int(match.group(1))
                group_num = int(match.group(2))
                key = (iteration_num, group_num)
                neurons = grouped_neuron_data.get(key, [])

                if key in self.timepoint_context.cphate:
                    old_cphate = self.timepoint_context.cphate[key]

                    self.issues.append(Issue(Severity.WARNING,
                                             f"A CphateGroupIteration for i={iteration_num} and g={group_num} "
                                             f"already exists. {old_cphate.objFile} will be overwritten by {filename}."))

                cphate_iteration = CphateGroupIteration(i=iteration_num, g=group_num, neurons=neurons, objFile=filename)
                self.timepoint_context.cphate[key] = cphate_iteration
            else:
                self.issues.append(
                    Issue(Severity.ERROR, get_mismatch_reason(filename, components, descriptions, self.cphate_path)))

    def get_issues(self):
        return self.issues

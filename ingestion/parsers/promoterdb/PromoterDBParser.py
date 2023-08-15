import os
from collections import defaultdict
from typing import List

import pandas as pd

from ingestion.parsers.models import Issue, Severity, Promoter
from ingestion.settings import PROMOTER_DB_APP, PROMOTER_XLS, PROMOTER_SHEET1, \
    PROMOTER_SHEET2, PROMOTER_SHEET1_PROMOTER_COLUMN, \
    PROMOTER_SHEET1_BEGIN_TIMEPOINT_COLUMN, PROMOTER_SHEET1_END_TIMEPOINT_COLUMN, PROMOTER_SHEET1_NEURONS_COLUMN, \
    PROMOTER_SHEET1_STRAIN_INFORMATION_COLUMN, PROMOTER_SHEET1_DETAILED_EXPRESSION_PATTERNS_COLUMN, \
    PROMOTER_SHEET2_NEURON_COLUMN, PROMOTER_SHEET2_REQUIRED_COLUMNS, PROMOTER_FOLDER, PROMOTER_FOLDER_PREFIX, \
    PROMOTER_EXPECTED_FILES, PROMOTER_SHEET2_NAME_COLUMN, PROMOTER_SHEET2_LOCATION_COLUMN, WORMBASE_PROMOTER_COL, \
    WORMBASE_ID_COL, WORMBASE_CSV, WORMBASE_PREFIX


class PromoterDBParser:
    def __init__(self, root_dir, neurons):
        self.app_path = os.path.join(root_dir, PROMOTER_DB_APP)
        if not os.path.exists(self.app_path):
            raise FileNotFoundError

        self.neurons_dict = get_neurons_by_name(neurons)
        self.issues: List[Issue] = []
        self.promoters = {}
        self.wormbase_dict = load_wormbase_data()

    def parse(self):
        spreadsheet_path = os.path.join(self.app_path, PROMOTER_XLS)
        if not os.path.exists(spreadsheet_path):
            self.issues.append(Issue(Severity.ERROR, f"{PROMOTER_XLS} spreadsheet missing"))
            return

        try:
            xls = pd.ExcelFile(spreadsheet_path)
        except Exception as e:
            self.issues.append(Issue(Severity.ERROR, f"Error reading {spreadsheet_path}: {str(e)}"))
            return

        self._parse_sheet1(xls, spreadsheet_path)
        self._parse_sheet2(xls, spreadsheet_path)
        self._validate_promoter_folders()

    def _parse_sheet1(self, xls, spreadsheet_path):
        promoters_dict = {}
        if PROMOTER_SHEET1 in xls.sheet_names:
            sheet1_df = xls.parse(PROMOTER_SHEET1)
            if self._is_sheet1_valid(sheet1_df, spreadsheet_path):
                self._extract_promoters_from_sheet1(sheet1_df)
        else:
            self.issues.append(Issue(Severity.ERROR, f"Missing {PROMOTER_SHEET1} in {spreadsheet_path}"))
        return promoters_dict

    def _is_sheet1_valid(self, df, path):
        is_valid = True
        for col in [PROMOTER_SHEET1_PROMOTER_COLUMN, PROMOTER_SHEET1_BEGIN_TIMEPOINT_COLUMN,
                    PROMOTER_SHEET1_END_TIMEPOINT_COLUMN, PROMOTER_SHEET1_NEURONS_COLUMN,
                    PROMOTER_SHEET1_STRAIN_INFORMATION_COLUMN, PROMOTER_SHEET1_DETAILED_EXPRESSION_PATTERNS_COLUMN]:
            if col not in df.columns:
                self.issues.append(Issue(Severity.ERROR, f"Missing column '{col}' in Sheet1 of {path}"))
                is_valid = False
        return is_valid

    def _extract_promoters_from_sheet1(self, df):
        for index, row in df.iterrows():
            promoter_name = row[PROMOTER_SHEET1_PROMOTER_COLUMN]
            promoter = self._get_promoter(promoter_name, row[PROMOTER_SHEET1_NEURONS_COLUMN],
                                          row[PROMOTER_SHEET1_BEGIN_TIMEPOINT_COLUMN],
                                          row[PROMOTER_SHEET1_END_TIMEPOINT_COLUMN], [])
            self.promoters[promoter_name] = promoter

    def _parse_sheet2(self, xls, spreadsheet_path):
        if PROMOTER_SHEET2 in xls.sheet_names:
            sheet2_df = xls.parse(PROMOTER_SHEET2)
            if self._is_sheet2_valid(sheet2_df, spreadsheet_path):
                self._extract_data_from_sheet2(sheet2_df)
        else:
            self.issues.append(Issue(Severity.ERROR, f"Missing {PROMOTER_SHEET2} in {spreadsheet_path}"))

    def _is_sheet2_valid(self, df, path):
        is_valid = True
        for col in PROMOTER_SHEET2_REQUIRED_COLUMNS:
            if col not in df.columns:
                self.issues.append(Issue(Severity.ERROR, f"Missing column '{col}' in {PROMOTER_SHEET2} of {path}"))
                is_valid = False
        return is_valid

    def _extract_data_from_sheet2(self, df):
        promoter_neurons = set()
        for col in df.columns:
            if col not in PROMOTER_SHEET2_REQUIRED_COLUMNS:
                for index, row in df.iterrows():
                    promoter_name = row[col]
                    if pd.notnull(promoter_name):
                        promoter_name = row[col].strip()
                        neuron_name = row[PROMOTER_SHEET2_NEURON_COLUMN]

                        if neuron_name in self.neurons_dict:
                            neurons = self.neurons_dict[neuron_name]
                            for neuron in neurons:
                                neuron.lineage = row[PROMOTER_SHEET2_NAME_COLUMN]
                                neuron.location = row[PROMOTER_SHEET2_LOCATION_COLUMN]
                                neuron.embryonic = True
                            promoter_neurons.add(neuron_name)
                        else:
                            self.issues.append(
                                Issue(Severity.WARNING,
                                      f"Neuron '{neuron_name}' mentioned in {PROMOTER_SHEET2} "
                                      f"is not present in neurons."))

                        if promoter_name in self.promoters:
                            if self.promoters[promoter_name].cellsByLineaging:
                                self.promoters[promoter_name].cellsByLineaging += f" {neuron_name}"
                            else:
                                self.promoters[promoter_name].cellsByLineaging = neuron_name
                        else:
                            self.issues.append(
                                Issue(Severity.WARNING,
                                      f"Promoter '{promoter_name}' found in {PROMOTER_SHEET2} but not in {PROMOTER_SHEET1}.")
                            )
                            new_promoter = self._get_promoter(promoter_name, None, [neuron_name], None, [])
                            self.promoters[promoter_name] = new_promoter

    def _validate_promoter_folders(self):
        promoters_base_path = os.path.join(self.app_path, PROMOTER_FOLDER)

        if not os.path.exists(promoters_base_path):
            self.issues.append(Issue(Severity.ERROR, f"Base promoter directory missing at {promoters_base_path}"))
            return

        all_promoter_dirs = [d for d in os.listdir(promoters_base_path) if
                             os.path.isdir(os.path.join(promoters_base_path, d))]

        for promoter_name, promoter in self.promoters.items():
            expected_folder_path = os.path.join(promoters_base_path, f"{PROMOTER_FOLDER_PREFIX}{promoter_name}")
            if not os.path.exists(expected_folder_path):
                self.issues.append(
                    Issue(Severity.WARNING, f"Missing folder for promoter '{promoter_name}' at {expected_folder_path}"))
            else:
                for expected_file in PROMOTER_EXPECTED_FILES:
                    if not os.path.exists(os.path.join(expected_folder_path, expected_file)):
                        self.issues.append(
                            Issue(Severity.WARNING, f"Missing file '{expected_file}' in folder {expected_folder_path}"))

        # Check if there are extra directories not present in our promoters
        for promoter_dir in all_promoter_dirs:
            promoter_name_from_dir = promoter_dir.replace(PROMOTER_FOLDER_PREFIX, '')
            if promoter_name_from_dir not in self.promoters:
                self.issues.append(Issue(Severity.WARNING,
                                         f"Extra promoter directory found '{promoter_dir}' "
                                         f"which is not mentioned in the spreadsheet."))

    def _get_promoter(self, name, cellular_expression_pattern, expression_begin, expression_termination,
                      cells_by_lineaging):

        wormbase_id = self.wormbase_dict.get(name, None)
        wormbase_url = ''
        if wormbase_id:
            wormbase_url = WORMBASE_PREFIX + wormbase_id
        else:
            self.issues.append(Issue(Severity.WARNING, f"No wormbase url found for {name}"))

        return Promoter(
            uid=name,
            metadata='',
            wormbase=wormbase_url,
            cellularExpressionPattern=cellular_expression_pattern,
            timePointStart=expression_begin,
            timePointEnd=expression_termination,
            cellsByLineaging=" ".join(cells_by_lineaging),
            otherCells=''
        )

    def get_issues(self):
        return self.issues

    def get_promoters(self):
        return self.promoters


def get_neurons_by_name(neurons_by_uid):
    neurons_by_name = defaultdict(list)
    for uid, neuron in neurons_by_uid.items():
        name = uid.split('-')[0]
        neurons_by_name[name].append(neuron)
    return neurons_by_name


def load_wormbase_data():
    current_directory = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(current_directory, WORMBASE_CSV)

    df = pd.read_csv(csv_path)
    wormbase_dict = {row[WORMBASE_PROMOTER_COL]: row[WORMBASE_ID_COL] for _, row in df.iterrows()}

    return wormbase_dict

import os
import pandas as pd


class PromoterDBValidator:
    def __init__(self, app_path):
        self.app_path = app_path
        self.issues = []

    def validate(self):
        self._validate_folder_structure()
        self._validate_spreadsheet()
        self._validate_promoter_folders()
        return self.issues

    def _validate_folder_structure(self):
        if 'promoters.xls' not in os.listdir(self.app_path):
            self.issues.append(f"Missing promoters.xls in {self.app_path}")
        for item in os.listdir(self.app_path):
            item_path = os.path.join(self.app_path, item)
            if item != "promoters.xls" and not os.path.isdir(item_path):
                self.issues.append(f"Unexpected file found in promoterdb: {item_path}")

    def _validate_spreadsheet(self):
        spreadsheet_path = os.path.join(self.app_path, 'promoters.xls')
        try:
            xls = pd.ExcelFile(spreadsheet_path)

            # Validate Sheet1
            if "Sheet1" in xls.sheet_names:
                sheet1_df = xls.parse("Sheet1")
                required_columns = ["Promoter", "Beginning of expression in minutes",
                                    "Termination of expression in minutes", "Neurons", "Strain information",
                                    "Detailed expression patterns"]
                for col in required_columns:
                    if col not in sheet1_df.columns:
                        self.issues.append(f"Missing column '{col}' in Sheet1 of {spreadsheet_path}")
            else:
                self.issues.append(f"Missing Sheet1 in {spreadsheet_path}")

            # Validate Cell-ID based on lineaging
            if "Cell-ID based on lineaging" in xls.sheet_names:
                lineage_df = xls.parse("Cell-ID based on lineaging")
                required_columns = ["Neuron", "Lineage", "Name", "Location"]
                for col in required_columns:
                    if col not in lineage_df.columns:
                        self.issues.append(
                            f"Missing column '{col}' in Cell-ID based on lineaging of {spreadsheet_path}")

                # Check for at least one Promoter column
                promoter_columns = [col for col in lineage_df.columns if col not in required_columns]
                if not promoter_columns:
                    self.issues.append(f"No Promoter columns found in Cell-ID based on lineaging of {spreadsheet_path}")

            else:
                self.issues.append(f"Missing Cell-ID based on lineaging sheet in {spreadsheet_path}")

        except Exception as e:
            self.issues.append(f"Error reading {spreadsheet_path}: {str(e)}")

    def _validate_promoter_folders(self):
        # Ensure there's a folder for each promoter
        if "Sheet1" in pd.ExcelFile(os.path.join(self.app_path, 'promoters.xls')).sheet_names:
            promoters_df = pd.read_excel(os.path.join(self.app_path, 'promoters.xls'), sheet_name="Sheet1")
            for promoter in promoters_df["Promoter"]:
                promoter_folder_path = os.path.join(self.app_path, promoter)
                if not os.path.exists(promoter_folder_path) or not os.path.isdir(promoter_folder_path):
                    self.issues.append(f"Missing folder for promoter '{promoter}' at {promoter_folder_path}")

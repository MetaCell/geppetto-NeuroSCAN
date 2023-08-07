import os
from collections import defaultdict

from ingestion.validation.neuroscan.NeuroScanValidator import NeuroScanValidator
from ingestion.validation.promoterdb.PromoterDBValidator import PromoterDBValidator
from ingestion.validation.settings import NEUROSCAN, PROMOTERDB
from ingestion.validation.utils import write_issues_to_log


class DatasetValidator:
    def __init__(self, root_path):
        self.root_path = root_path
        self.issues = defaultdict(lambda: defaultdict(list))

    def validate(self):
        for app in os.listdir(self.root_path):
            app_path = os.path.join(self.root_path, app)
            if app == NEUROSCAN:
                app_issues = NeuroScanValidator(app_path).validate()
                for entity, entity_issues in app_issues.items():
                    self.issues[app][entity].extend(entity_issues)
            elif app == PROMOTERDB:
                app_issues = PromoterDBValidator(app_path).validate()
                for entity, entity_issues in app_issues.items():
                    self.issues[app][entity].extend(entity_issues)
            else:
                self.issues[app]['general'].append(f"Unknown application folder: {app_path}")
        return self.issues

    def log_issues(self, log_path="issues.log"):
        write_issues_to_log(self.issues, log_path)

import argparse
import os
import shutil
import subprocess

from ingestion.loaders.contacts import load_contacts
from ingestion.loaders.cphate import load_cphate
from ingestion.loaders.neurons import load_neurons
from ingestion.loaders.promoters import load_promoters
from ingestion.loaders.synapses import load_synapses
from ingestion.parsers.DataExporter import DataExporter
from ingestion.parsers.models import Issue, Severity
from ingestion.parsers.neuroscan.NeuroScanParser import NeuroScanParser
from ingestion.parsers.promoterdb.PromoterDBParser import PromoterDBParser
from ingestion.settings import NEUROSCAN_APP, GENERAL_ERRORS, PROMOTER_DB_APP
from utils import log_issues_to_file, has_error_issues


# def zip_cphate(timepoint):
#     os.chdir(os.path.join(curpwd, "data", "neuroscan", timepoint, "cphate"))
#     with zipfile.ZipFile('cphate.zip', 'w') as zipf:
#         for root, _, files in os.walk("."):
#             for file in files:
#                 zipf.write(os.path.join(root, file))
#
#
#
# def avi2mp4():
#     os.chdir(os.path.join(curpwd, "data", "promoterdb"))
#     subprocess.run(["./avi2mp4.sh"])
#


def main(root_dir, dry_run=False, transform=False, output_dir="./output"):
    clean(output_dir)

    issues = {
        GENERAL_ERRORS: [],
        NEUROSCAN_APP: None,
        PROMOTER_DB_APP: None,
    }

    neuroscan_parser = None
    neurons = []

    try:
        neuroscan_parser = NeuroScanParser(root_dir)
    except FileNotFoundError:
        issues[GENERAL_ERRORS].append(Issue(Severity.ERROR, f"{NEUROSCAN_APP} folder not found"))

    if neuroscan_parser:
        neuroscan_parser.parse()
        issues[NEUROSCAN_APP] = neuroscan_parser.get_issues()
        neurons = neuroscan_parser.get_all_neurons()

    promoter_db_parser = None
    try:
        promoter_db_parser = PromoterDBParser(root_dir, neurons)
    except FileNotFoundError:
        issues[GENERAL_ERRORS].append(Issue(Severity.ERROR, f"{PROMOTER_DB_APP} folder not found"))

    if promoter_db_parser:
        promoter_db_parser.parse()
        issues[PROMOTER_DB_APP] = promoter_db_parser.get_issues()

    log_issues_to_file(issues, os.path.join(output_dir, "issues.log"))

    if has_error_issues(issues):
        print(f"Critical errors found during validation."
              f"See {output_dir}/issues.log for details")
        return

    data_exporter = DataExporter(neuroscan_parser, promoter_db_parser)
    data_exporter.export_all(output_dir)

    if transform:
        pass
        # zip_cphate(timepoint)
        # avi2mp4()

    if not dry_run:
        load_data(output_dir, neuroscan_parser.get_all_timepoints())


def clean(output_dir="output"):
    if os.path.exists(output_dir):
        shutil.rmtree(output_dir)
    os.makedirs(output_dir)


def load_data(data_dir, all_timepoints=None):
    for timepoint in all_timepoints:
        load_cphate(timepoint, data_dir)
    load_neurons(data_dir)
    load_contacts(data_dir)
    load_synapses(data_dir)
    load_promoters(data_dir)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Script to process datasets.")
    parser.add_argument('--root-dir', type=str, required=True, help="Path of the files to ingest")
    parser.add_argument("--dry-run", action="store_true", help="If set, data ingestion will not occur.")
    parser.add_argument("--transform", action="store_true", help="If set, data ingestion will not occur.")
    parser.add_argument("--output-dir", type=str, default='./output',
                        help="Directory to store output files. Defaults to 'output'.")

    args = parser.parse_args()

    main(args.root_dir, args.dry_run, args.transform, args.output_dir)

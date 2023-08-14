import glob
import os
import subprocess
import shutil
import argparse
import zipfile

from ingestion.parsers.models import Issue, Severity
from ingestion.parsers.neuroscan.ContactsParser import ContactsParser
from ingestion.parsers.neuroscan.NeuroScanParser import NeuroScanParser
from ingestion.parsers.neuroscan.NeuronsParser import NeuronsParser
from ingestion.parsers.neuroscan.SynapsesParser import SynapsesParser
from ingestion.parsers.promoterdb.PromoterDBParser import PromoterDBParser
from ingestion.settings import NEURONS_FOLDER, NEUROSCAN_APP, SYNAPSES_FOLDER, CONTACTS_FOLDER, CONTACTS_XLS, \
    PROMOTER_DB_APP, GENERAL_ERRORS, PROMOTER_DB_APP
from utils import log_issues_to_file


# def zip_cphate(timepoint):
#     os.chdir(os.path.join(curpwd, "data", "neuroscan", timepoint, "cphate"))
#     with zipfile.ZipFile('cphate.zip', 'w') as zipf:
#         for root, _, files in os.walk("."):
#             for file in files:
#                 zipf.write(os.path.join(root, file))
#
#
#
# def copy_promoters():
#     destination = os.path.join(curpwd, "data", "promoterdb")
#     if not os.path.exists(destination):
#         os.makedirs(destination)
#     for item in os.listdir(os.path.join(data_root, "promoterdb")):
#         shutil.copytree(os.path.join(data_root, "promoterdb", item), os.path.join(destination, item))
#
#
# def transform_promoters():
#     os.chdir(os.path.join(parsers, "promoters"))
#     subprocess.run(["python", "parser.py"])
#     for csv_file in glob.glob("*.csv"):
#         shutil.move(csv_file, os.path.join(curpwd, "output"))
#     append_logs_to_output("promoters")
#
#
# def avi2mp4():
#     os.chdir(os.path.join(curpwd, "data", "promoterdb"))
#     subprocess.run(["./avi2mp4.sh"])
#
#
#
#
# def append_logs_to_output(entity):
#     with open(os.path.join(curpwd, "output", "output.log"), "a") as log_file:
#         log_file.write(f"\n=====================\n{entity}\n=====================\n")
#         with open(f"{entity}.log", "r") as f:
#             log_file.write(f.read())
#     os.remove(f"{entity}.log")


def main(root_dir, dry_run=False, output_dir="./output"):
    clean(output_dir)

    issues = {
        GENERAL_ERRORS: [],
        NEUROSCAN_APP: None,
        PROMOTER_DB_APP: None,
    }

    neuroscan_parser = None
    try:
        neuroscan_parser = NeuroScanParser(root_dir)
    except FileNotFoundError:
        issues[GENERAL_ERRORS].append(Issue(Severity.ERROR, f"{NEUROSCAN_APP} folder not found"))

    if neuroscan_parser:
        neuroscan_parser.parse()
        issues[NEUROSCAN_APP] = neuroscan_parser.get_issues()

    promoter_db_parser = None
    try:
        promoter_db_parser = PromoterDBParser(root_dir)
    except FileNotFoundError:
        issues[GENERAL_ERRORS].append(Issue(Severity.ERROR, f"{PROMOTER_DB_APP} folder not found"))

    if promoter_db_parser:
        promoter_db_parser.parse()
        issues[PROMOTER_DB_APP] = promoter_db_parser.get_issues()

    # copy_neuroscan(timepoint)
    # transform_cphate()
    # zip_cphate(timepoint)
    # transform_contacts()
    # transform_synapses()
    #
    # copy_promoters()
    # transform_promoters()
    # avi2mp4()

    log_issues_to_file(issues, os.path.join(output_dir, "issues.log"))

    if not dry_run:
        load_data()


def clean(output_dir="output"):
    if os.path.exists(output_dir):
        shutil.rmtree(output_dir)
    os.makedirs(output_dir)


def load_data():
    # os.chdir(loaders)
    # subprocess.run(["python", "cphate.py", "--timepoint", os.path.basename(timepoint)])
    # subprocess.run(["python", "neurons.py"])
    # subprocess.run(["python", "contacts.py"])
    # subprocess.run(["python", "synapses.py"])
    # subprocess.run(["python", "promoters.py"])
    pass


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Script to process datasets.")
    parser.add_argument('--root-dir', type=str, required=True, help="Path of the files to ingest")
    parser.add_argument("--dry-run", action="store_true", help="If set, data ingestion will not occur.")
    parser.add_argument("--output-dir", type=str, default='./output',
                        help="Directory to store output files. Defaults to 'output'.")

    args = parser.parse_args()

    main(args.root_dir, args.dry_run, args.output_dir)

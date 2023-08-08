import glob
import os
import subprocess
import shutil
import argparse
import zipfile

from ingestion.parsers.neuroscan.ContactsParser import ContactsParser
from ingestion.parsers.neuroscan.NeuronsParser import NeuronsParser
from ingestion.parsers.neuroscan.ParsingContext import ParsingContext
from ingestion.parsers.neuroscan.SynapsesParser import SynapsesParser
from ingestion.settings import NEURONS_FOLDER, NEUROSCAN_APP, SYNAPSES_FOLDER, CONTACTS_FOLDER


def clean():
    if os.path.exists("output"):
        shutil.rmtree("output")
    os.makedirs("output")


def copy_neuroscan(timepoint):
    destination = os.path.join(curpwd, "data", "neuroscan", os.path.dirname(timepoint))
    if os.path.exists(destination):
        shutil.rmtree(destination)
    os.makedirs(destination)
    shutil.copytree(os.path.join(data_root, "NeuroSCAN", timepoint), destination)


def zip_cphate(timepoint):
    os.chdir(os.path.join(curpwd, "data", "neuroscan", timepoint, "cphate"))
    with zipfile.ZipFile('cphate.zip', 'w') as zipf:
        for root, _, files in os.walk("."):
            for file in files:
                zipf.write(os.path.join(root, file))


def transform_cphate():
    os.chdir(os.path.join(parsers, "c-phate"))
    subprocess.run(["python", "generate_json.py"])
    shutil.move("cphate.json", os.path.join(curpwd, "output"))
    with open(os.path.join(curpwd, "output", "output.log"), "a") as log_file:
        log_file.write("=====================\ncphate\n=====================\n")
        with open("*.log", "r") as f:
            log_file.write(f.read())
    os.remove("*.log")


def copy_promoters():
    destination = os.path.join(curpwd, "data", "promoterdb")
    if not os.path.exists(destination):
        os.makedirs(destination)
    for item in os.listdir(os.path.join(data_root, "promoterdb")):
        shutil.copytree(os.path.join(data_root, "promoterdb", item), os.path.join(destination, item))


def transform_promoters():
    os.chdir(os.path.join(parsers, "promoters"))
    subprocess.run(["python", "parser.py"])
    for csv_file in glob.glob("*.csv"):
        shutil.move(csv_file, os.path.join(curpwd, "output"))
    append_logs_to_output("promoters")


def avi2mp4():
    os.chdir(os.path.join(curpwd, "data", "promoterdb"))
    subprocess.run(["./avi2mp4.sh"])


def load_data(timepoint):
    os.chdir(loaders)
    subprocess.run(["python", "cphate.py", "--timepoint", os.path.basename(timepoint)])
    subprocess.run(["python", "neurons.py"])
    subprocess.run(["python", "contacts.py"])
    subprocess.run(["python", "synapses.py"])
    subprocess.run(["python", "promoters.py"])


def append_logs_to_output(entity):
    with open(os.path.join(curpwd, "output", "output.log"), "a") as log_file:
        log_file.write(f"\n=====================\n{entity}\n=====================\n")
        with open(f"{entity}.log", "r") as f:
            log_file.write(f.read())
    os.remove(f"{entity}.log")


def main(root_dir, dry_run=False):
    clean()
    parsing_context = ParsingContext()

    neuroscan_app_path = os.path.join(root_dir, NEUROSCAN_APP)

    for dev_stage in os.listdir(neuroscan_app_path):
        dev_stage_path = os.path.join(neuroscan_app_path, dev_stage)

        neurons_path = os.path.join(dev_stage_path, NEURONS_FOLDER)
        parse_neurons(neurons_path, dev_stage, parsing_context)

        synapses_path = os.path.join(dev_stage_path, SYNAPSES_FOLDER)
        parse_synapses(synapses_path, dev_stage, parsing_context)

        contacts_path = os.path.join(dev_stage_path, CONTACTS_FOLDER)
        parse_contacts(contacts_path, dev_stage, parsing_context)

    # copy_neuroscan(timepoint)
    # transform_cphate()
    # zip_cphate(timepoint)
    # transform_contacts()
    # transform_synapses()
    #
    # copy_promoters()
    # transform_promoters()
    # avi2mp4()

    if not dry_run:
        load_data(args.timepoint)


def parse_neurons(neurons_path, dev_stage, context):
    neurons_parser = NeuronsParser(neurons_path, dev_stage, context)
    neurons_parser.parse()


def parse_synapses(synapses_path, dev_stage, context):
    synapses_parser = SynapsesParser(synapses_path, dev_stage, context)
    synapses_parser.parse()


def parse_contacts(contacts_path, dev_stage, context):
    contacts_parser = ContactsParser(contacts_path, dev_stage, context)
    contacts_parser.parse()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Script to process datasets.")
    parser.add_argument('--root-dir', type=str, required=True, help="Path of the files to ingest")
    parser.add_argument("--dry-run", action="store_true", help="If set, data ingestion will not occur.")

    args = parser.parse_args()

    main(args.root_dir, args.dry_run)

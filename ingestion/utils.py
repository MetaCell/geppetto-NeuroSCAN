from typing import Dict, List

from ingestion.parsers.models import TimepointContext
from ingestion.parsers.neuroscan.models import Neuron
from ingestion.settings import GENERAL_ERRORS, NEUROSCAN_APP, PROMOTER_DB_APP


def log_issues_to_file(issues, file_path):
    with open(file_path, 'w') as f:
        # Log general errors
        if issues[GENERAL_ERRORS]:
            f.write("General Errors:\n")
            for issue in issues[GENERAL_ERRORS]:
                f.write(f"{issue.severity.value.upper()}: {issue.reason}\n")
            f.write("\n")

        # Log NeuroScan app issues
        if issues[NEUROSCAN_APP]:
            neuroscan_issues = issues[NEUROSCAN_APP]
            f.write("NeuroScan App Issues:\n")
            for category, issues_list in neuroscan_issues.__dict__.items():
                if issues_list:  # if there are any issues in the category
                    f.write(f"  {category.capitalize()}:\n")
                    for issue in issues_list:
                        f.write(f"    {issue.severity.value.upper()}: {issue.reason}\n")
            f.write("\n")

        if issues[PROMOTER_DB_APP]:
            promoterdb_issues = issues[PROMOTER_DB_APP]
            f.write("PromoterDB App Issues:\n")

            for issue in promoterdb_issues:
                f.write(f"    {issue.severity.value.upper()}: {issue.reason}\n")
            f.write("\n")


def get_all_neurons(timepoints: Dict[str, TimepointContext]) -> Dict[str, List[Neuron]]:
    all_neurons = {}
    for timepoint, context in timepoints.items():
        for neuron_name, neuron in context.neurons.items():
            if neuron_name in all_neurons:
                all_neurons[neuron_name].append(neuron)
            else:
                all_neurons[neuron_name] = [neuron]
    return all_neurons

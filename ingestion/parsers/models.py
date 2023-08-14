from dataclasses import dataclass, field
from enum import Enum
from typing import Dict, List, Tuple

from ingestion.parsers.neuroscan.models import Neuron, Synapse, Contact, CphateGroupIteration


class Severity(Enum):
    WARNING = "warning"
    ERROR = "error"


@dataclass
class Issue:
    severity: Severity
    reason: str


@dataclass
class NeuroScanIssues:
    neurons: List[Issue] = field(default_factory=list)
    synapses: List[Issue] = field(default_factory=list)
    contacts: List[Issue] = field(default_factory=list)
    cphate: List[Issue] = field(default_factory=list)
    general: List[Issue] = field(default_factory=list)


@dataclass
class TimepointContext:
    timepoint: str

    neurons: Dict[str, Neuron] = field(default_factory=dict)
    synapses: Dict[str, Synapse] = field(default_factory=dict)
    contacts: Dict[str, Contact] = field(default_factory=dict)
    cphate: Dict[Tuple[int, int], CphateGroupIteration] = field(default_factory=dict)

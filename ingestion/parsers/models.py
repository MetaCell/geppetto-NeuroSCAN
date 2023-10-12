from dataclasses import dataclass, field
from enum import Enum
from typing import Dict, List, Tuple


@dataclass
class Promoter:
    uid: str
    metadata: str
    wormbase: str
    cellularExpressionPattern: str
    timePointStart: int
    timePointEnd: int
    cellsByLineaging: str
    otherCells: str
    information: str
    expressionPatterns: str


@dataclass
class Neuron:
    metadata: str
    wormatlas: str
    embryonic: bool
    lineage: str
    location: str
    filename: str
    timepoint: str
    name: str
    uid: str


@dataclass
class Synapse:
    neuronPre: str
    type: str
    metadata: str
    section: str
    zs: str
    position: str
    neuronPost: List[str]
    neuronSite: str
    filename: str
    timepoint: str
    postNeuron: str
    name: str
    uid: str


@dataclass
class Contact:
    neuronA: str
    neuronB: str
    metadata: str
    weight: int
    filename: str
    timepoint: str
    name: str
    uid: str


@dataclass
class CphateClusterIteration:
    i: int
    c: int
    neurons: List[str]
    objFile: str


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

    def __iter__(self):
        for attr, value in self.__dict__.items():
            yield from value


@dataclass
class TimepointContext:
    timepoint: str

    neurons: Dict[str, Neuron] = field(default_factory=dict)
    synapses: Dict[str, Synapse] = field(default_factory=dict)
    contacts: Dict[str, Contact] = field(default_factory=dict)
    cphate: Dict[Tuple[int, int], CphateClusterIteration] = field(default_factory=dict)

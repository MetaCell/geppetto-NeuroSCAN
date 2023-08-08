from dataclasses import dataclass
from typing import List, Set


@dataclass
class Neuron:
    name: str
    metadata: str
    timepoints: Set[str]
    files: List[str]
    wormatlas: str
    lineage: str
    location: str


@dataclass
class Synapse:
    name: str
    pre: str
    post: str
    synapse_type: str
    stages: Set[str]
    files: List[str]
    metadata: str


@dataclass
class Contact:
    name: str
    neuronA: str
    neuronB: str
    stages: Set[str]
    files: List[str]
    weight: float
    metadata: str


@dataclass
class CphateGroupIteration:
    i: int
    g: int
    neurons: List[str]
    objFile: str

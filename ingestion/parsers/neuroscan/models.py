from dataclasses import dataclass
from typing import List


@dataclass
class Neuron:
    name: str
    metadata: str
    timepoint: str
    file: str
    wormatlas: str
    lineage: str
    location: str
    embryonic: bool


@dataclass
class Synapse:
    name: str
    pre: str
    post: str
    synapse_type: str
    timepoint: str
    file: str
    metadata: str


@dataclass
class Contact:
    name: str
    neuronA: str
    neuronB: str
    timepoint: str
    file: str
    weight: int
    metadata: str


@dataclass
class CphateGroupIteration:
    i: int
    g: int
    neurons: List[str]
    objFile: str

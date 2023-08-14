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
    type: str
    name: str
    timepoint: str
    metadata: str
    section: str
    zs: str
    position: str
    file: str
    pre: str
    post: str
    neuron_site: str


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

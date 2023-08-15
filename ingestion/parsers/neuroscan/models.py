from dataclasses import dataclass
from typing import List


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
    neuronPost: str
    neuronSite: str
    filename: str
    timepoint: str
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

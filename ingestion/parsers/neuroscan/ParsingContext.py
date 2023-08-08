from dataclasses import dataclass, field
from typing import List, Set, Dict

from ingestion.parsers.neuroscan.models import CphateGroupIteration, Contact, Synapse, Neuron


@dataclass
class ParsingContext:
    neurons: Dict[str, Neuron] = field(default_factory=dict)
    neuron_issues: List[str] = field(default_factory=list)

    synapses: Dict[str, Synapse] = field(default_factory=dict)
    synapse_issues: List[str] = field(default_factory=list)

    contacts: Dict[str, Contact] = field(default_factory=dict)
    contact_issues: List[str] = field(default_factory=list)

    cphate: Set[CphateGroupIteration] = field(default_factory=set)
    cphate_issues: List[str] = field(default_factory=list)

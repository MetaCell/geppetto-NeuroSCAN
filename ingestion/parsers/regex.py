import re

from ingestion.settings import FILE_PREFIX, SYNAPSE_PRE_POSITION_TYPE, SYNAPSE_POST_POSITION_TYPE

MESH_FILE_TYPE_REG_GROUP = "(gltf|obj)"
NEURON_NAME_REG_GROUP = r"([\w\s-]+)"
NEURON_CONNECTION_TYPE_REG_GROUP = "(chemical|electrical)"
NEURON_POSITION_TYPE_REG_GROUP = f"(?i)({SYNAPSE_PRE_POSITION_TYPE}|{SYNAPSE_POST_POSITION_TYPE})"
NEURON_COMBINED_NAME_GROUP = r"([\w\s-]+(?:&[\w-]+)*)"
SYNAPSE_IDENTIFIER_AND_ID_GROUP = r"~([A-Za-z]_[\d_]+)"


def get_neuron_regex_components():
    components = [
        FILE_PREFIX,
        "_",
        NEURON_NAME_REG_GROUP,
        fr"\.{MESH_FILE_TYPE_REG_GROUP}$"
    ]
    descriptions = [
        "prefix pattern",
        "underscore separator",
        "neuron naming pattern",
        "filetype pattern"
    ]
    return ''.join(components), components, descriptions


def get_synapse_folder_regex_components():
    components = [
        NEURON_NAME_REG_GROUP,
        "_",
        NEURON_POSITION_TYPE_REG_GROUP,
        "$"
    ]
    descriptions = [
        "neuron naming pattern",
        "underscore separator",
        "synapse positioning pattern"
    ]
    return ''.join(components), components, descriptions


def get_synapse_regex_components():
    components = [
        FILE_PREFIX,
        "_",
        NEURON_NAME_REG_GROUP,
        NEURON_CONNECTION_TYPE_REG_GROUP,
        NEURON_COMBINED_NAME_GROUP,
        SYNAPSE_IDENTIFIER_AND_ID_GROUP,
        NEURON_POSITION_TYPE_REG_GROUP,
        fr"\.{MESH_FILE_TYPE_REG_GROUP}$"
    ]
    descriptions = [
        "prefix pattern",
        "underscore separator for neuron name",
        "source neuron naming pattern",
        "connection pattern",
        "destination neurons pattern",
        "synapse identifier pattern",
        "synapse positioning pattern",
        "filetype pattern"
    ]
    return ''.join(components), components, descriptions


def get_contact_regex_components():
    components = [
        FILE_PREFIX,
        "_",
        NEURON_NAME_REG_GROUP,
        "by",
        NEURON_NAME_REG_GROUP,
        fr"\.{MESH_FILE_TYPE_REG_GROUP}$"
    ]
    descriptions = [
        "prefix pattern",
        "underscore separator for neuron A",
        "neuron naming pattern for neuron A",
        "by separator",
        "neuron naming pattern for neuron B",
        "filetype pattern"
    ]
    return ''.join(components), components, descriptions


def get_cphate_regex_components():
    components = [
        fr"[\w\s]+",
        fr"\.i",
        fr"(\d+)",
        fr"\.c",
        fr"(\d+)",
        fr"\.[\w\s]+",
        fr"\.{MESH_FILE_TYPE_REG_GROUP}$"
    ]
    descriptions = [
        "filename prefix pattern",
        "iteration prefix",
        "iteration pattern",
        "cluster prefix",
        "cluster pattern",
        "ID pattern",
        "filetype pattern"
    ]
    return ''.join(components), components, descriptions


def get_mismatch_reason(filename, pattern_components, descriptions, folder_path=''):
    accumulated_pattern = ""
    for pattern, description in zip(pattern_components, descriptions):
        accumulated_pattern += pattern
        if not re.match(accumulated_pattern, filename):
            return f"Filename '{folder_path}/{filename}' doesn't match up to the {description}."
    return None

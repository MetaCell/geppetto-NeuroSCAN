import re

from ingestion.validation.settings import FILE_PREFIX

MESH_FILE_TYPE_REG_GROUP = "(gltf|obj)"
NEURON_NAME_REG_GROUP = r"([\w\s]+)"
NEURON_CONNECTION_TYPE_REG_GROUP = "(chemical|electrical)"
NEURON_POSITION_TYPE_REG_GROUP = "(PreSyn|PostSyn|preSyn|postSyn)"


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


def get_synapse_regex_components():
    components = [
        FILE_PREFIX,
        "_",
        NEURON_NAME_REG_GROUP,
        NEURON_CONNECTION_TYPE_REG_GROUP,
        fr"([\w\s]+)",
        "_",
        fr"([\w\s]+)",
        NEURON_POSITION_TYPE_REG_GROUP,
        fr"\.{MESH_FILE_TYPE_REG_GROUP}$"
    ]
    descriptions = [
        "prefix pattern",
        "underscore separator for neuron name",
        "source neuron naming pattern",
        "connection pattern",
        "destination neurons pattern",
        "underscore separator for destination neurons",
        "zs info pattern",
        "synapse positioning pattern",
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


def get_mismatch_reason(filename, pattern_components, descriptions):
    """
    Check the filename against each pattern component sequentially and provide feedback on
    which part of the pattern caused the mismatch.

    :param filename: The filename to validate.
    :param pattern_components: A list of regex pattern components.
    :param descriptions: A list of descriptions corresponding to each pattern component.
    :return: A feedback string indicating which part of the pattern caused the mismatch.
             If all components match, return an indication that the filename is valid.
    """
    for pattern, description in zip(pattern_components, descriptions):
        if not re.match(pattern, filename):
            return f"Filename '{filename}' doesn't match the {description}."

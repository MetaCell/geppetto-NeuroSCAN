from ingestion.validation.settings import FILE_PREFIX

MESH_FILE_TYPE_REG_GROUP = "(gltf|obj)"
NEURON_NAME_REG_GROUP = r"([\w\s]+)"
NEURON_CONNECTION_TYPE_REG_GROUP = "(chemical|electrical)"
NEURON_POSITION_TYPE_REG_GROUP = "(PreSyn|PostSyn|preSyn|postSyn)"


def get_neuron_regex():
    return fr"{FILE_PREFIX}_{NEURON_NAME_REG_GROUP}\.{MESH_FILE_TYPE_REG_GROUP}$"


def get_synapse_regex():
    return fr"{FILE_PREFIX}_{NEURON_NAME_REG_GROUP}{NEURON_CONNECTION_TYPE_REG_GROUP}\
        ([\w\s]+)_([\w\s]+){NEURON_POSITION_TYPE_REG_GROUP}\.{MESH_FILE_TYPE_REG_GROUP}$"


def get_synapse_folder_regex():
    return fr"{NEURON_NAME_REG_GROUP}_{NEURON_POSITION_TYPE_REG_GROUP}$"


def get_contact_regex():
    return fr"{FILE_PREFIX}_{NEURON_NAME_REG_GROUP}by{NEURON_NAME_REG_GROUP}\." \
           fr"{MESH_FILE_TYPE_REG_GROUP}$"


def get_cphate_regex():
    return fr"[\w\s]+\.i(\d+)\.c(\d+)\.[\w\s]+\.{MESH_FILE_TYPE_REG_GROUP}$"


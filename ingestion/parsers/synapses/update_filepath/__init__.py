import json


def custom_script(data):
    for tp in data:
        for synapse in data[tp]:
            for source in data[tp][synapse]:
                if 'files' in data[tp][synapse][source]:
                    data[tp][synapse][source]['files'] = json.dumps(
                        ['/' + data[tp][synapse][source]['files'].replace('../', '')]
                    )
    return data

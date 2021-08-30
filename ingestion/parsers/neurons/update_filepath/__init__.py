import json


def custom_script(data):
    for tp in data:
        for neuron in data[tp]:
            for source in data[tp][neuron]:
                if 'files' in data[tp][neuron][source]:
                    data[tp][neuron][source]['files'] = json.dumps(
                        ['/' + data[tp][neuron][source]['files'].replace('../', '')]
                    )
    return data

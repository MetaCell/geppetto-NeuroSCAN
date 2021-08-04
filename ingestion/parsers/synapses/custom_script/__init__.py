import json


def custom_script(data):
    for tp in data:
        for synapse in data[tp]:
            source = list(data[tp][synapse].keys())[0]  # synapses only have 1 source
            data[tp][synapse] = {source: data[tp][synapse][source]}
            data[tp][synapse][source]['neuronPost'] = data[tp][synapse][source]['neuronPost'].split('&')
            data[tp][synapse][source]['neuronSite'] = data[tp][synapse][source]['neuronPost'][
                int(data[tp][synapse][source]['neuronSite'])]
            data[tp][synapse][source]['neuronPost'] = json.dumps(data[tp][synapse][source]['neuronPost'] )
            data[tp][synapse][source]['position'] = data[tp][synapse][source]['position'].lower()
            data[tp][synapse][source]['timepoints'] = json.dumps([data[tp][synapse][source]['timepoints']])
            data[tp][synapse][source]['uid'] = data[tp][synapse][source]['uid'].replace('&', '_')
    return data

import json


def custom_script(data):
    for tp in data:
        for synapse in data[tp]:
            source = list(data[tp][synapse].keys())[0]  # synapses only have 1 source
            data[tp][synapse] = {source: data[tp][synapse][source]}
            if data[tp][synapse][source]['neuronPost']:
                data[tp][synapse][source]['neuronPost'] = data[tp][synapse][source]['neuronPost'].split('_')
                # if there is a neuronSite (only exists if this is a post synapses) then set the postNeuron
                # to the Post Neuron by index neuronSite
                if (data[tp][synapse][source]['neuronSite'] != '') and \
                   (data[tp][synapse][source]['neuronSite'] is not None):
                    postNeuronSite = int(data[tp][synapse][source]['neuronSite'])-1
                    data[tp][synapse][source]['postNeuron'] = data[tp][synapse][source]['neuronPost'][postNeuronSite]
                else:
                    data[tp][synapse][source]['postNeuron'] = None
            else:
                data[tp][synapse][source]['neuronPost'] = None
            data[tp][synapse][source]['position'] = data[tp][synapse][source]['position']
            data[tp][synapse][source]['uid'] = data[tp][synapse][source]['uid'].replace('&', '_')
            data[tp][synapse][source]['neuronPost'] = json.dumps(data[tp][synapse][source]['neuronPost'] )
    return data

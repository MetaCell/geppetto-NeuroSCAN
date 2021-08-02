def custom_script(data):
    for tp in data:
        for synapse in data[tp]:
            source = list(data[tp][synapse].keys())[0]
            data[tp][synapse] = {source: data[tp][synapse][source]}
            data[tp][synapse][source]['neuronPost'] = data[tp][synapse][source]['neuronPost'].split('&')
            data[tp][synapse][source]['position'] = data[tp][synapse][source]['position'].lower()
    return data

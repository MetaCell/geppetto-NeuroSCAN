def get_promoters_from_string(promoter_string):
    return [promoter.strip() for promoter in promoter_string.split(',') if promoter != 'nan']


def custom_script(data):
    new_dict = {}
    for split in data:
        new_dict[split] = {}
        for neuron in data[split]:
            for source in data[split][neuron]:
                for promoter in get_promoters_from_string(data[split][neuron][source]['promoter']):
                    if promoter in new_dict[split]:
                        new_dict[split][promoter][source]['cellsByLineaging'].append(neuron)
                    else:
                        new_dict[split][promoter] = {
                            source: {
                                'uid': promoter,
                                'cellsByLineaging': [neuron]
                            }
                        }

    return new_dict

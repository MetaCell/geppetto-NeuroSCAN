def custom_script(data):
    for neuron in data:
        if 'DCR_PromoterPipeline_Revised2021_Updated.xlsx' in data[neuron].keys():
            data[neuron]['DCR_PromoterPipeline_Revised2021_Updated.xlsx']['embrionic'] = True
    return data

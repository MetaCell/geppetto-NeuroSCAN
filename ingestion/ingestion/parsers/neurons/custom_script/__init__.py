import json


def custom_script(data):
    for tp in data:
        for neuron in data[tp]:
            if '../../../data/promoterdb/DCR_PromoterPipeline_Revised2021_Updated.xlsx_Cell-ID based on lineaging' in \
                    data[tp][neuron].keys():
                data[tp][neuron][
                    '../../../data/promoterdb/DCR_PromoterPipeline_Revised2021_Updated.xlsx_Cell-ID based on lineaging'][
                    'embryonic'] = True
            else:
                data[tp][neuron][list(data[tp][neuron].keys())[0]]['embryonic'] = False
            for source in data[tp][neuron]:
                if 'timepoints' in data[tp][neuron][source]:
                    data[tp][neuron][source]['timepoints'] = json.dumps([data[tp][neuron][source]['timepoints']])
    return data

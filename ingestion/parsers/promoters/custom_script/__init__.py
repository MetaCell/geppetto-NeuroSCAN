import json


def custom_script(data):
    for tp in data:
        for promoter in data[tp]:
            for source in data[tp][promoter]:
                if 'cellsByLineaging' in data[tp][promoter][source]:
                    data[tp][promoter][source]['cellsByLineaging'] = json.dumps(
                        data[tp][promoter][source]['cellsByLineaging'])
    return data

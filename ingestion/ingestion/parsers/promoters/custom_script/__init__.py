import json
import math


def custom_script(data):
    for tp in data:
        for promoter in data[tp]:
            for source in data[tp][promoter]:
                if 'cellsByLineaging' in data[tp][promoter][source]:
                    data[tp][promoter][source]['cellsByLineaging'] = ' '.join(data[tp][promoter][source]['cellsByLineaging'])
                if 'otherCells' in data[tp][promoter][source]:
                    if isinstance(data[tp][promoter][source]['otherCells'], str):
                        value = data[tp][promoter][source]['otherCells']
                        value = value.replace(',', ' ').replace('  ',' ')
                        data[tp][promoter][source]['otherCells'] = value
                    else:
                        data[tp][promoter][source]['otherCells'] = None

                data[tp][promoter][source]['uid'] = data[tp][promoter][source]['uid'] \
                    .replace(' ', '_').replace('(', '_').replace(')', '_')
    return data

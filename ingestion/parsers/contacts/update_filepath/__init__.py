import json


def custom_script(data):
    for tp in data:
        for contact in data[tp]:
            for source in data[tp][contact]:
                if 'files' in data[tp][contact][source]:
                    data[tp][contact][source]['files'] = json.dumps(
                        ['/' + data[tp][contact][source]['files'].replace('../', '')]
                    )
    return data

def custom_script(data):
    new_data = {}
    for tp in data:
        new_data[tp] = {}
        for contact in data[tp]:
            contact_id = f"{tp}-{contact}"
            new_data[tp][contact_id] = {}
            for source in data[tp][contact]:
                new_data[tp][contact_id][source] = data[tp][contact][source]
                new_data[tp][contact_id][source]['uid'] = f"{tp}-{data[tp][contact][source]['uid']}"
    return new_data

import requests
from bs4 import BeautifulSoup

from ingestion.parsers.common.IParser import IParser
from ingestion.parsers.common.utils import get, get_source_split


class WebParser(IParser):
    mandatory_attributes = ['url', 'id_action']

    def __init__(self, config):
        if all(item in list(config.__dict__.keys()) for item in self.mandatory_attributes):
            self.cfg = config
            self.data = {}
        else:
            raise Exception('Wrong configuration WebParser')

    def parse(self):
        page = requests.get(self.cfg.url)
        soup = BeautifulSoup(page.content, 'html.parser')
        dataset = soup.findAll(**self.cfg.id_action.selector.__dict__)
        source = self.cfg.url
        source_split = get_source_split(source, getattr(self.cfg, 'split', None))
        self.data[source_split] = {}
        for entry in dataset:
            entry_id = self._apply_actuator(entry, self.cfg.id_action.actuator,
                                            getattr(self.cfg.id_action, 'map', None))

            self.data[source_split][entry_id] = {source: {}}
            for action in self.cfg.actions.__dict__:
                self.data[source_split][entry_id][source][action] = self._apply_actuator(entry,
                                                                           self.cfg.actions.__dict__[action].actuator,
                                                                           getattr(self.cfg.actions.__dict__[action],
                                                                                   'map', None))

    def _apply_actuator(self, entry, actuator, map):
        value = get(entry.__dict__, actuator)
        if map:
            return str(map.replace('${element}', value))
        return str(value)

    def get_data(self):
        return self.data

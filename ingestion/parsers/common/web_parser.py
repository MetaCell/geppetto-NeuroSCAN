import requests
from bs4 import BeautifulSoup

from ingestion.parsers.common.IParser import IParser
from ingestion.parsers.common.utils import Config, get


class WebParser(IParser):
  mandatory_attributes = ['url', 'id_action']

  def __init__(self, config: Config):
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
    for entry in dataset:
      entry_id = self._apply_actuator(entry, self.cfg.id_action.actuator)
      self.data[entry_id] = {source: {}}
      for action in self.cfg.actions.__dict__:
        self.data[entry_id][source][action] = self._apply_actuator(entry, self.cfg.actions.__dict__[action].actuator)

  def _apply_actuator(self, entry, actuator):
    return get(entry.__dict__, actuator)

  def get_data(self):
    return self.data

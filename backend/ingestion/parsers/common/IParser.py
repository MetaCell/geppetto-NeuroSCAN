from abc import ABC, abstractmethod


class IParser(ABC):

  @abstractmethod
  def parse(self):
    pass

  @abstractmethod
  def get_data(self):
    pass

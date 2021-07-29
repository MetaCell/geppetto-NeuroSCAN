import yaml

from ingestion.parsers.common.parser_config import ParserConfig
from ingestion.parsers.common.utils import merge_dict


class PipelineReader:

    def __init__(self, input_file):
        self.actions = {
            'read': self._read_config,
            'join': self._join
        }
        self.join_strategies = {
            'left': self._left_join
        }

        with open(input_file, 'r') as stream:
            try:
                self.pipeline = yaml.safe_load(stream)
                self.stage_results = []
            except yaml.YAMLError as exc:
                print(exc)

    def start(self):
        if 'stages' not in self.pipeline:
            return
        for idx, stage in enumerate(self.pipeline['stages']):
            action = stage.split('_')[0]
            if action in self.actions.keys():
                self.actions[action](stage, idx)

    def _read_config(self, stage, idx):
        filename = '_'.join(stage.split('_')[1:])
        self.stage_results.insert(idx, ParserConfig(filename).get_parser())
        self.stage_results[idx].parse()

    def _join(self, stage, idx):
        attrs = stage.split('_')[1:]
        strategy = attrs[0]
        left = attrs[1]
        right = attrs[2]
        if strategy in self.join_strategies.keys():
            self.join_strategies[strategy](idx, left, right)

    def _left_join(self, idx, l, r):
        self.stage_results.insert(idx, merge_dict(self.stage_results[l].get_data(), self.stage_results[r].get_data()))

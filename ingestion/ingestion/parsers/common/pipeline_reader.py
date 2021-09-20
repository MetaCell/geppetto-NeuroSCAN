import importlib.util
import pickle

import yaml

from ingestion.parsers.common.config import Config
from ingestion.parsers.common.data_exporter import DataExporter
from ingestion.parsers.common.utils import merge_dict, JoinStrategies


class PipelineReader:

    def __init__(self, input_file):
        self.actions = {
            'read': self._read_config,
            'join': self._join,
            'export': self._export,
            'custom': self._custom
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
        parser = Config(filename).get_parser()
        parser.parse()
        self.stage_results.insert(idx, parser.get_data())

    def _join(self, stage, idx):
        attrs = stage.split('_')[1:]
        strategy = attrs[0]
        left = int(attrs[1])
        right = int(attrs[2])
        if strategy in JoinStrategies.list():
            self.stage_results.insert(idx, merge_dict(self.get_result(left),
                                                      self.get_result(right),
                                                      strategy))

    def _export(self, stage, idx):
        attrs = stage.split('_')[1:]
        data_idx = int(attrs[0])
        filename = '_'.join(attrs[1:])
        config = Config(filename).get_config()
        is_successful = False
        if config.output_file and config.header:
            is_successful = DataExporter(self.get_result(data_idx)).to_csv(output_file=config.output_file,
                                                                           headers=config.header)
        self.stage_results.insert(idx, is_successful)

    def _custom(self, stage, idx):
        attrs = stage.split('_')[1:]
        data_idx = int(attrs[0])
        filepath = '_'.join(attrs[1:])
        spec = importlib.util.spec_from_file_location("custom_script", filepath)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        func = getattr(module, 'custom_script')
        self.stage_results.insert(idx, func(self.get_result(data_idx)))

    def get_result(self, idx):
        return pickle.loads(pickle.dumps(self.stage_results[idx]))

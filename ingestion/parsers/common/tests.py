import unittest

from ingestion.parsers.common.utils import merge_dict, JoinStrategies


class TestStringMethods(unittest.TestCase):

    def setUp(self):
        self.dict_a = {'a': {'sourceA': 1}}
        self.dict_b = {'b': {'sourceB': 1}}
        self.dict_c = {'a': {'sourceC': 2}}

    def test_merge_dict_full(self):
        merge_ab = merge_dict(self.dict_a, self.dict_b, JoinStrategies.FULL.value)
        assert merge_ab['a']['sourceA'] == 1 and merge_ab['b']['sourceB'] == 1

        merge_ac = merge_dict(self.dict_a, self.dict_c, JoinStrategies.FULL.value)
        assert isinstance(merge_ac['a'], dict) and len(merge_ac['a'].keys()) == 2

    def test_merge_dict_left(self):
        merge_ab = merge_dict(self.dict_a, self.dict_b, JoinStrategies.LEFT.value)
        assert merge_ab['a']['sourceA'] == 1 and 'b' not in merge_ab

        merge_ac = merge_dict(self.dict_a, self.dict_c, JoinStrategies.LEFT.value)
        assert isinstance(merge_ac['a'], dict) and len(merge_ac['a'].keys()) == 2

    def test_merge_dict_right(self):
        merge_ab = merge_dict(self.dict_a, self.dict_b, JoinStrategies.RIGHT.value)
        assert merge_ab['b']['sourceB'] == 1 and 'a' not in merge_ab

        merge_ac = merge_dict(self.dict_a, self.dict_c, JoinStrategies.RIGHT.value)
        assert isinstance(merge_ac['a'], dict) and len(merge_ac['a'].keys()) == 2


if __name__ == '__main__':
    unittest.main()

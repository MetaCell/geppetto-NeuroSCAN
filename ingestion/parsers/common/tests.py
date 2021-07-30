import unittest

from ingestion.parsers.common.utils import merge_dict, JoinStrategies


class TestStringMethods(unittest.TestCase):

    def setUp(self):
        self.dict_a = {'timepoint1': {'uidA': {'sourceA': 1}}, 'timepoint2': {'uidA': {'sourceA': 1}}}
        self.dict_b = {'timepoint1': {'uidB': {'sourceB': 1}}, 'timepoint2': {'uidB2': {'sourceB': 11}}}
        self.dict_c = {'timepoint1': {'uidA': {'sourceC': 2}}}

    def test_merge_dict_full(self):
        merge_ab = merge_dict(self.dict_a, self.dict_b, JoinStrategies.FULL.value)
        assert merge_ab['timepoint1']['uidA']['sourceA'] == 1 and merge_ab['timepoint2']['uidA']['sourceA'] == 1 \
               and merge_ab['timepoint1']['uidB']['sourceB'] == 1 and merge_ab['timepoint2']['uidB2']['sourceB'] == 11

        merge_ac = merge_dict(self.dict_a, self.dict_c, JoinStrategies.FULL.value)
        assert merge_ac['timepoint1']['uidA']['sourceA'] == 1 and merge_ac['timepoint2']['uidA']['sourceA'] == 1 and \
               merge_ac['timepoint1']['uidA']['sourceC'] == 2

    def test_merge_dict_left(self):
        merge_ab = merge_dict(self.dict_a, self.dict_b, JoinStrategies.LEFT.value)
        assert merge_ab['timepoint1']['uidA']['sourceA'] == 1 and merge_ab['timepoint2']['uidA']['sourceA'] == 1 \
               and 'uidB' not in merge_ab['timepoint1'] and 'uidB2' not in merge_ab['timepoint2']

        merge_ac = merge_dict(self.dict_a, self.dict_c, JoinStrategies.LEFT.value)
        assert merge_ac['timepoint1']['uidA']['sourceA'] == 1 and merge_ac['timepoint2']['uidA']['sourceA'] == 1 and \
               merge_ac['timepoint1']['uidA']['sourceC'] == 2

    def test_merge_dict_right(self):
        merge_ab = merge_dict(self.dict_a, self.dict_b, JoinStrategies.RIGHT.value)
        assert merge_ab['timepoint1']['uidB']['sourceB'] == 1 and merge_ab['timepoint2']['uidB2'][
            'sourceB'] == 11 and 'uidA' not in merge_ab['timepoint1'] and 'uidA' not in merge_ab['timepoint2']

        merge_ac = merge_dict(self.dict_a, self.dict_c, JoinStrategies.RIGHT.value)
        assert merge_ac['timepoint1']['uidA']['sourceA'] == 1 and 'timepoint2' not in merge_ac and \
               merge_ac['timepoint1']['uidA']['sourceC'] == 2

    def test_merge_dict_inner(self):
        merge_ab = merge_dict(self.dict_a, self.dict_b, JoinStrategies.INNER.value)
        assert len(merge_ab) == 0

        merge_ac = merge_dict(self.dict_a, self.dict_c, JoinStrategies.INNER.value)
        assert merge_ac['timepoint1']['uidA']['sourceA'] == 1 and 'timepoint2' not in merge_ac and \
               merge_ac['timepoint1']['uidA']['sourceC'] == 2


if __name__ == '__main__':
    unittest.main()

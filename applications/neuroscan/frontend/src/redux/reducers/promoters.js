import {
  PROMOTERS_UPDATE_FILTERS,
  PROMOTERS_UPDATE_RESULTS,
  PROMOTERS_COUNT_RESULTS,
} from '../actions/promoters';

export const PROMOTERS_DEFAULT_STATUS = {
  filters: {
    searchString: '',
    neurons: [],
    timepoint: null,
  },
  promoters: [],
  count: 0,
};

export default (state = PROMOTERS_DEFAULT_STATUS, action) => {
  switch (action.type) {
    case PROMOTERS_UPDATE_FILTERS: {
      return {
        ...state,
        filters: action.data,
        promoters: [],
        count: 0,
      };
    }

    case PROMOTERS_UPDATE_RESULTS: {
      return {
        ...state,
        promoters: action.data,
      };
    }

    case PROMOTERS_COUNT_RESULTS: {
      return {
        ...state,
        count: action.data,
      };
    }

    default:
      return state;
  }
};

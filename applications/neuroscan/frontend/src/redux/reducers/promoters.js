import {
  PROMOTERS_LOAD,
  PROMOTERS_UPDATE_RESULTS,
} from '../actions/promoters';

export const PROMOTERS_DEFAULT_STATUS = {
  promoters: [],
};

export default (state = PROMOTERS_DEFAULT_STATUS, action) => {
  switch (action.type) {
    case PROMOTERS_LOAD: {
      return {
        ...state,
        filters: action.data,
        promoters: [],
      };
    }

    case PROMOTERS_UPDATE_RESULTS: {
      return {
        ...state,
        promoters: action.data,
      };
    }

    default:
      return state;
  }
};

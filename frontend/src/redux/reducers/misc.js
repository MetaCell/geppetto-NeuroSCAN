import { RAISE_ERROR, WAIT_DATA } from '../actions/misc';

export const MISC_DEFAULT_STATUS = {};

export default (state = MISC_DEFAULT_STATUS, action) => {
  switch (action.type) {
    case WAIT_DATA:
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.data.offAction]: action.data.message,
        },
      };
    case RAISE_ERROR:
      return {
        ...state,
        error: action.error,
        loading: {},
      };
    default:
      return state;
  }
};

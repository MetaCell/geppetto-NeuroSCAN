import { RAISE_ERROR, LOADING, LOADING_SUCCESS } from '../actions/misc';

export const MISC_DEFAULT_STATUS = {};

export default (state = MISC_DEFAULT_STATUS, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.data.offAction]: action.data.message,
        },
      };
    case LOADING_SUCCESS: {
      const newState = { ...state };
      delete newState.loading[action.data.offAction];
      return newState;
    }
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

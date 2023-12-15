import {
  RAISE_ERROR,
  LOADING,
  LOADING_SUCCESS,
  CANVAS_UPDATE_STARTED,
  CANVAS_UPDATE_ENDED,
} from '../actions/misc';

import { CANVAS_STARTED, CANVAS_FINISHED } from '../../utilities/constants';

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
    case CANVAS_UPDATE_STARTED:
      return {
        ...state,
        canvas: CANVAS_STARTED,
      };
    case CANVAS_UPDATE_ENDED:
      return {
        ...state,
        canvas: CANVAS_FINISHED,
      };
    default:
      return state;
  }
};

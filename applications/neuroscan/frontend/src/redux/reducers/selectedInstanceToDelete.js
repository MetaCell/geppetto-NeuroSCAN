import { ADD_LAST_SELECTED_INSTANCE } from '../actions/widget';

const initialState = {};

const selectedInstanceToDeleteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LAST_SELECTED_INSTANCE:
      return {
        ...state,
        viewerId: action.viewerId,
        uid: action.uid,
      };

    default:
      return state;
  }
};

export default selectedInstanceToDeleteReducer;

import { UPDATE_SELECTED_INSTANCES } from '../actions/widget';

const initialState = {
  selectedInstance: {},
};

const selectedInstancesReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SELECTED_INSTANCES:
      return {
        ...state,
        selectedInstance: {
          viewerId: action.viewerId,
          instance: action.uids,
        },
      };
    default:
      return state;
  }
  // {...state, 123: ['ADAL]}
  // {...state,
  // selectedInstances: {
  // id1: [],
  // id2: [],
  // }}
};

export default selectedInstancesReducer;

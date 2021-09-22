import { RECEIVED_DEVSTAGES } from '../actions/devStages';

export const DEVSTAGES_DEFAULT_STATUS = [];

export default (state = DEVSTAGES_DEFAULT_STATUS, action) => {
  switch (action.type) {
    case RECEIVED_DEVSTAGES:
    {
      return action.data;
    }

    default:
      return state;
  }
};

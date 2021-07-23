import { RECEIVED_DEVSTAGES } from '../actions/devStages';

export const DEVSTAGES_DEFAULT_STATUS = {};

export default (state = DEVSTAGES_DEFAULT_STATUS, action) => {
  switch (action.type) {
    case RECEIVED_DEVSTAGES:
    {
      const devStages = {};
      action.data.forEach((devStage) => { devStages[devStage.uid] = devStage; });
      return {
        ...state,
        ...devStages,
      };
    }

    default:
      return state;
  }
};

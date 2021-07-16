import { ADD_DEVSTAGE } from '../actions/devStages';

export const DEVSTAGES_DEFAULT_STATUS = {};

export default (state = DEVSTAGES_DEFAULT_STATUS, action) => {
  switch (action.type) {
    case ADD_DEVSTAGE:
    {
      const devStages = {};
      action.data.forEach(({ uid, devStageData }) => { devStages[uid] = devStageData; });
      return {
        ...state,
        ...devStages,
      };
    }

    default:
      return state;
  }
};

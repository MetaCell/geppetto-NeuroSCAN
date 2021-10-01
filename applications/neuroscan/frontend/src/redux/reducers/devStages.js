import { RECEIVED_DEVSTAGES } from '../actions/devStages';

export const DEVSTAGES_DEFAULT_STATUS = {
  neuroSCAN: [],
  promoterDB: [],
};

export default (state = DEVSTAGES_DEFAULT_STATUS, action) => {
  switch (action.type) {
    case RECEIVED_DEVSTAGES:
    {
      return {
        neuroSCAN: action.data.filter((devStage) => !devStage.promoterDB),
        promoterDB: action.data.filter((devStage) => devStage.promoterDB),
      };
    }

    default:
      return state;
  }
};

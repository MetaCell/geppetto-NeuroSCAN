import { ADD_DEVSTAGES, receivedDevStages } from './actions/devStages';
import { raiseError } from './actions/misc';
import { DevStageService } from '../services/DevStageService';

const devStagesService = new DevStageService();

const middleware = (store) => (next) => (action) => {
  switch (action.type) {
    case ADD_DEVSTAGES: {
      devStagesService.getDevStages().then((stages) => {
        store.dispatch(receivedDevStages(stages));
      }, (e) => {
        // eslint-disable-next-line no-console
        console.error('Error getting development stages', e);
        next(raiseError('Error getting development stages'));
      });
      break;
    }

    default:
      next(action);
  }
};

export default middleware;

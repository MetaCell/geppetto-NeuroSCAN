import * as layoutActions from '@metacell/geppetto-meta-client/common/layout/actions';
import { ADD_DEVSTAGES, receivedDevStages } from './actions/devStages';
import { raiseError } from './actions/misc';
import { ADD_INSTANCES, ADD_INSTANCES_TO_GROUP } from './actions/widget';
import { DevStageService } from '../services/DevStageService';
import { addToWidget } from '../utilities/functions';
// eslint-disable-next-line import/no-cycle
import {
  createSimpleInstancesFromInstances,
  updateInstanceGroup,
} from '../services/instanceHelpers';

const devStagesService = new DevStageService();

const getWidget = (store, viewerId) => {
  const state = store.getState();
  const { widgets } = state;
  return widgets[viewerId];
};

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

    case ADD_INSTANCES: {
      createSimpleInstancesFromInstances(action.instances)
        .then(() => store
          .dispatch(
            addToWidget(
              getWidget(store, action.viewerId),
              action.instances,
            ),
          ));
      break;
    }

    case ADD_INSTANCES_TO_GROUP: {
      const { viewerId, instances, group } = action;
      const widget = getWidget(store, viewerId);
      // set selected state of instance(s)
      widget.config.instances = updateInstanceGroup(
        widget.config.instances,
        instances,
        group,
      );
      store.dispatch(layoutActions.updateWidget(widget));
      break;
    }

    default:
      next(action);
  }
};

export default middleware;

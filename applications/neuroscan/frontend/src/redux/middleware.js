import { addWidget } from '@metacell/geppetto-meta-client/common/layout/actions';
import { WidgetStatus } from '@metacell/geppetto-meta-client/common/layout/model';
import { v4 as uuidv4 } from 'uuid';
import { ADD_VIEWER, ADD_INSTANCES_VIEWER, addInstancesViewer } from './actions/viewers';
import { ADD_DEVSTAGES, receivedDevStages } from './actions/devStages';
import { raiseError, waitData } from './actions/misc';
import { DevStageService } from '../services/DevStageService';
import { createSimpleInstancesFromInstances } from '../services/helpers';

const devStagesService = new DevStageService();
function widgetFromViewerSpec(viewerSpec) {
  return {
    id: viewerSpec.viewerId,
    name: `${viewerSpec.type}_${viewerSpec.viewerId}`,
    component: viewerSpec.type,
    panelName: 'centralPanel',
    enableClose: true,
    enableRename: true,
    enableDrag: true,
    status: WidgetStatus.ACTIVE,
    config: {
      viewerId: viewerSpec.viewerId,
    },
  };
}

const middleware = (store) => (next) => (action) => {
  switch (action.type) {
    case ADD_DEVSTAGES: {
      next(waitData('Getting development stages...', action.type));
      devStagesService.getDevStages().then((stages) => {
        store.dispatch(receivedDevStages(stages));
      }, (e) => {
        // eslint-disable-next-line no-console
        console.error('Error getting development stages', e);
        next(raiseError('Error getting development stages'));
      });
      break;
    }
    case ADD_VIEWER: {
      next(waitData(`Getting ${action.type}`));
      const nextData = { ...action.data, instances: [], viewerId: uuidv4() };
      const nextAction = { ...action, data: nextData };
      next(nextAction);
      store.dispatch(addWidget(widgetFromViewerSpec(nextAction.data)));
      store.dispatch(addInstancesViewer(nextAction.data.viewerId, action.data.instances));
      break;
    }
    case ADD_INSTANCES_VIEWER: {
      next(waitData(`Adding instances ${action.type}`));
      // create new Geppetto Simple instances from the new instances
      createSimpleInstancesFromInstances(action.data.instances)
        .then(() => next(action));
      break;
    }

    default:
      next(action);
  }
};

export default middleware;

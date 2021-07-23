import { addWidget } from '@metacell/geppetto-meta-client/common/layout/actions';
import { WidgetStatus } from '@metacell/geppetto-meta-client/common/layout/model';
import { v4 as uuidv4 } from 'uuid';
import { ADD_VIEWER } from './actions/viewers';
import { ADD_DEVSTAGES, receivedDevStages } from './actions/devStages';
import { raiseError, waitData } from './actions/misc';
import { DevStageService } from '../services/DevStageService';

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
      // eslint-disable-next-line no-param-reassign
      action.data.viewerId = uuidv4();
      next(action);
      store.dispatch(addWidget(widgetFromViewerSpec(action.data)));
      break;
    }

    default:
      next(action);
  }
};

export default middleware;

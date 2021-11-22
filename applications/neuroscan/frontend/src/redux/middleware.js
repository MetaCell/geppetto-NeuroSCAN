import * as layoutActions from '@metacell/geppetto-meta-client/common/layout/actions';
import { updateWidget } from '@metacell/geppetto-meta-client/common/layout/actions';
import { ADD_DEVSTAGES, receivedDevStages } from './actions/devStages';
import { raiseError } from './actions/misc';
import {
  ADD_INSTANCES,
  ADD_INSTANCES_TO_GROUP,
  SET_INSTANCES_COLOR,
  UPDATE_TIMEPOINT_VIEWER,
  UPDATE_BACKGROUND_COLOR_VIEWER,
  UPDATE_WIDGET_CONFIG,
  ROTATE_START_ALL,
  ROTATE_STOP_ALL,
  updateWidgetConfig,
} from './actions/widget';
import { DevStageService } from '../services/DevStageService';
import neuronService from '../services/NeuronService';
import contactService from '../services/ContactService';
import synapseService from '../services/SynapseService';
import {
  CONTACT_TYPE,
  NEURON_TYPE,
  SYNAPSE_TYPE,
} from '../utilities/constants';
// eslint-disable-next-line import/no-cycle
import { cameraControlsRotateState } from '../components/Chart/CameraControls';
// eslint-disable-next-line import/no-cycle
import { addToWidget } from '../utilities/functions';
// eslint-disable-next-line import/no-cycle
import {
  createSimpleInstancesFromInstances,
  updateInstanceGroup,
  setInstancesColor,
  getInstancesOfType,
} from '../services/instanceHelpers';

const devStagesService = new DevStageService();

const getWidget = (store, viewerId) => {
  const state = store.getState();
  const { widgets } = state;
  const widget = widgets[viewerId];
  if (!widget) {
    const { timePoint } = state.search.filters;
    const devStages = state.devStages.neuroSCAN;
    const devStage = devStages.find((ds) => ds.begin <= timePoint && ds.end >= timePoint);
    const viewerNumber = Object.values(widgets).reduce((maxViewerNumber, w) => {
      const found = w.name.match('^Viewer (?<id>\\d+) .*');
      if (found && found.length > 0) {
        const thisViewerNumber = parseInt(found[1], 10);
        return Math.max(thisViewerNumber + 1, maxViewerNumber);
      }
      return maxViewerNumber;
    }, 1);
    return {
      id: null,
      name: `Viewer ${viewerNumber} (${devStage.name} ${timePoint})`,
      timePoint,
    };
  }
  return {
    ...widget,
  };
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

    case UPDATE_BACKGROUND_COLOR_VIEWER: {
      const widget = getWidget(store, action.viewerId);
      widget.config.backgroundColor = action.backgroundColor;
      store.dispatch(updateWidget(widget));
      break;
    }

    case UPDATE_WIDGET_CONFIG: {
      const widget = getWidget(store, action.viewerId);
      widget.config = {
        ...widget.config,
        ...action.config,
      };
      store.dispatch(updateWidget(widget));
      break;
    }

    case UPDATE_TIMEPOINT_VIEWER: {
      const widget = getWidget(store, action.viewerId);
      const { timePoint } = action;
      const { instances } = widget.config;

      if (timePoint !== widget.config.timePoint) {
        const neurons = getInstancesOfType(instances, NEURON_TYPE) || ['-1'];
        const contacts = getInstancesOfType(instances, CONTACT_TYPE) || ['-1'];
        const synapses = getInstancesOfType(instances, SYNAPSE_TYPE) || ['-1'];

        neuronService.getByUID(timePoint, neurons.map((n) => n.uidFromDb))
          .then((newNeurons) => {
            contactService.getByUID(timePoint, contacts.map((n) => n.uidFromDb))
              .then((newContacts) => {
                synapseService.getByUID(timePoint, synapses.map((n) => n.uidFromDb))
                  .then((newSynapses) => {
                    const newInstances = newNeurons.concat(newContacts.concat(newSynapses));
                    widget.config.timePoint = timePoint; // update the current widget's timepoint
                    createSimpleInstancesFromInstances(newInstances)
                      .then(() => {
                        store
                          .dispatch(
                            addToWidget(
                              widget,
                              newInstances,
                              true,
                            ),
                          );
                      });
                  });
              });
          });
      }
      break;
    }

    case ADD_INSTANCES_TO_GROUP: {
      const { viewerId, instances, group } = action;
      const widget = getWidget(store, viewerId);
      // set groupe of instance(s)
      widget.config.instances = updateInstanceGroup(
        widget.config.instances,
        instances,
        group,
      );
      store.dispatch(layoutActions.updateWidget(widget));
      break;
    }

    case SET_INSTANCES_COLOR: {
      const { viewerId, instances, color } = action;
      const widget = getWidget(store, viewerId);
      // set color of instance(s)
      widget.config.instances = setInstancesColor(
        widget.config.instances,
        instances,
        color,
      );
      store.dispatch(layoutActions.updateWidget(widget));
      break;
    }

    case ROTATE_START_ALL: {
      const state = store.getState();
      const newRotateState = cameraControlsRotateState.STARTING;
      Object.values(state.widgets)
        .filter((w) => w.config.rotate === cameraControlsRotateState.STOP)
        .forEach((w) => {
          store.dispatch(updateWidgetConfig(w.config.viewerId, {
            ...w.config,
            rotate: newRotateState,
          }));
        });
      break;
    }

    case ROTATE_STOP_ALL: {
      const state = store.getState();
      const newRotateState = cameraControlsRotateState.STOPPING;
      Object.values(state.widgets)
        .filter((w) => w.config.rotate === cameraControlsRotateState.ROTATING)
        .forEach((w) => {
          store.dispatch(updateWidgetConfig(w.config.viewerId, {
            ...w.config,
            rotate: newRotateState,
          }));
        });
      break;
    }

    default:
      next(action);
  }
};

export default middleware;

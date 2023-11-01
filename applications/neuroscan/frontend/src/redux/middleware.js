import * as layoutActions from '@metacell/geppetto-meta-client/common/layout/actions';
import { updateWidget } from '@metacell/geppetto-meta-client/common/layout/actions';
import { ADD_DEVSTAGES, receivedDevStages } from './actions/devStages';
import { raiseError, loading, loadingSuccess } from './actions/misc';
import {
  ADD_INSTANCES,
  ADD_INSTANCES_TO_GROUP,
  CLONE_VIEWER_WITH_INSTANCES_LIST,
  SET_INSTANCES_COLOR,
  UPDATE_TIMEPOINT_VIEWER,
  UPDATE_BACKGROUND_COLOR_VIEWER,
  UPDATE_WIDGET_CONFIG,
  ROTATE_START_ALL,
  ROTATE_STOP_ALL,
  updateWidgetConfig,
  INVERT_COLORS_FLASHING,
  SET_ORIGINAL_COLORS_FLASHING, TOGGLE_INSTANCE_HIGHLIGHT, addInstances,
} from './actions/widget';
import { DevStageService } from '../services/DevStageService';
import neuronService from '../services/NeuronService';
import contactService from '../services/ContactService';
import synapseService from '../services/SynapseService';
// eslint-disable-next-line import/no-cycle
import cphateService from '../services/CphateService';
import {
  CONTACT_TYPE,
  NEURON_TYPE,
  SYNAPSE_TYPE, VIEWERS,
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
  mapToInstance,
  invertColorSelectedInstances,
  setOriginalColorSelectedInstances, fetchDataForEntity,
} from '../services/instanceHelpers';

const devStagesService = new DevStageService();

const createWidget = (store, timePoint, viewerType) => {
  const state = store.getState();
  const { widgets } = state;
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
    name: `${viewerType} ${viewerNumber} (${devStage.name} ${timePoint})`,
    type: viewerType,
    timePoint,
  };
};

const getWidget = (store, viewerId) => {
  const state = store.getState();
  const { widgets } = state;
  if (!widgets) {
    return false;
  }
  const widget = widgets[viewerId];
  return !widget ? false : { ...widget };
};

const middleware = (store) => (next) => async (action) => {
  switch (action.type) {
    case ADD_DEVSTAGES: {
      const msg = 'Getting development stages';
      next(loading(msg, action.type));
      devStagesService.getDevStages().then((stages) => {
        store.dispatch(receivedDevStages(stages));
        next(loadingSuccess(msg, action.type));
      }, (e) => {
        next(raiseError(msg));
      });
      break;
    }

    case ADD_INSTANCES: {
      const msg = 'Creating and adding instances to the viewer';
      next(loading(msg, action.type));
      createSimpleInstancesFromInstances(action.instances)
        .then(() => {
          let widget = getWidget(store, action.viewerId, action.viewerType);
          if (!widget) {
            const state = store.getState();
            widget = createWidget(store, state.search.filters.timePoint, action.viewerType);
          }
          const addedObjectsToViewer = Array.isArray(widget?.config?.instances)
            && widget?.config?.instances.length !== 0
            ? widget.config.instances.concat(action.instances) : action.instances;

          store.dispatch(
            addToWidget(
              widget,
              action.instances,
              false,
              addedObjectsToViewer,
            ),
          );
          next(loadingSuccess(msg, action.type));
        }, (e) => {
          next(raiseError(msg));
        });
      break;
    }

    case CLONE_VIEWER_WITH_INSTANCES_LIST: {
      const msg = 'Cloning viewer and adding instances to the viewer';
      next(loading(msg, action.type));
      const currentWidget = getWidget(store, action.fromViewerId);
      const { timePoint } = currentWidget.config;

      createSimpleInstancesFromInstances(action.instances)
        .then(() => {
          const widget = createWidget(store, timePoint, VIEWERS.InstanceViewer);
          store.dispatch(
            addToWidget(
              widget,
              action.instances,
              false,
              action.instances,
            ),
          );
          next(loadingSuccess(msg, action.type));
        }, (e) => {
          next(raiseError(msg));
        });
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

    case INVERT_COLORS_FLASHING: {
      const widget = getWidget(store, action.viewerId);
      const instances = invertColorSelectedInstances(
        widget.config.instances,
        action.uids,
      );
      widget.config = {
        ...widget.config,
        instances,
      };
      store.dispatch(updateWidget(widget));
      break;
    }

    case SET_ORIGINAL_COLORS_FLASHING: {
      const widget = getWidget(store, action.viewerId);
      const instances = setOriginalColorSelectedInstances(
        widget.config.instances,
        action.uids,
      );
      widget.config = {
        ...widget.config,
        instances,
      };
      store.dispatch(updateWidget(widget));
      break;
    }

    case UPDATE_TIMEPOINT_VIEWER: {
      const widget = getWidget(store, action.viewerId);
      const { timePoint } = action;
      const { addedObjectsToViewer } = widget.config;

      if (timePoint !== widget.config.timePoint) {
        if (widget.component === VIEWERS.CphateViewer) {
          const msg = 'Updating cphate';
          next(loading(msg, action.type));
          cphateService
            .getCphateByTimepoint(timePoint)
            .then((cphate) => {
              if (cphate) {
                const cphateInstances = cphateService.getInstances(cphate);
                createSimpleInstancesFromInstances(cphateInstances)
                  .then(() => {
                    widget.config.timePoint = timePoint;
                    store
                      .dispatch(
                        addToWidget(
                          widget,
                          cphateInstances,
                          true,
                        ),
                      );
                    next(loadingSuccess(msg, action.type));
                  });
              }
            }, (e) => {
              next(raiseError(msg));
            });
        } else {
          const neurons = getInstancesOfType(addedObjectsToViewer, NEURON_TYPE) || [];
          const contacts = getInstancesOfType(addedObjectsToViewer, CONTACT_TYPE) || [];
          const synapses = getInstancesOfType(addedObjectsToViewer, SYNAPSE_TYPE) || [];

          const newNeurons = await fetchDataForEntity(neuronService, timePoint, neurons);
          const newContacts = await fetchDataForEntity(contactService, timePoint, contacts);
          const newSynapses = await fetchDataForEntity(synapseService, timePoint, synapses);

          const newInstances = [...newNeurons, ...newContacts, ...newSynapses]
            .map((i) => mapToInstance(i));
          widget.config.timePoint = timePoint; // update the current widget's timepoint
          await createSimpleInstancesFromInstances(newInstances);
          store.dispatch(addToWidget(widget, newInstances, true, addedObjectsToViewer));
        }
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

    case TOGGLE_INSTANCE_HIGHLIGHT: {
      const { viewerId, optionName } = action.payload;
      const state = store.getState();
      const currentHighlighted = state.widgets[viewerId]?.config?.highlightedInstances || [];
      const isCurrentlyHighlighted = currentHighlighted.includes(optionName);
      const updatedHighlighted = isCurrentlyHighlighted
        ? currentHighlighted.filter((name) => name !== optionName)
        : [...currentHighlighted, optionName];
      store.dispatch(updateWidgetConfig(viewerId, {
        ...state.widgets[viewerId].config,
        highlightedInstances: updatedHighlighted,
      }));
      break;
    }

    default:
      next(action);
  }
};

export default middleware;

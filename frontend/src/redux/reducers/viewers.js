// import CameraControls from '@metacell/geppetto-meta-ui/camera-controls/CameraControls';
import CameraControls from '../../components/Chart/CameraControls';

import {
  ADD_INSTANCES_VIEWER, ADD_VIEWER, COLOR_INSTANCES_VIEWER, REMOVE_VIEWER,
} from '../actions/viewers';

const defaultCameraOptions = {
  angle: 50,
  near: 0.01,
  far: 1000,
  baseZoom: 1,
  cameraControls: {
    instance: CameraControls,
    props: { wireframeButtonEnabled: false },
  },
  reset: false,
  autorotate: false,
  wireframe: false,
};

export const VIEWERS_DEFAULT_STATUS = {};

export default (state = VIEWERS_DEFAULT_STATUS, action) => {
  switch (action.type) {
    case ADD_VIEWER:
    {
      return {
        ...state,
        [action.data.viewerId]: {
          instances: action.data.instances,
          type: action.data.type,
          cameraOptions: defaultCameraOptions,
        },
      };
    }
    case ADD_INSTANCES_VIEWER:
    {
      return {
        ...state,
        [action.data.viewerId]: {
          ...state[action.data.viewerId],
          instances: [...state[action.data.viewerId].instances, ...action.data.instances],
        },
      };
    }
    case COLOR_INSTANCES_VIEWER:
    {
      const instancesColorMap = new Set(action.data.instances.map((i) => i.uid));
      const newInstances = state[action.data.viewerId].instances.map((item) => {
        if (instancesColorMap.has(item.uid)) {
          const clone = Object.assign(Object.create(Object.getPrototypeOf(item)), item);
          clone.color = action.data.color;
          return clone;
        }
        return item;
      });
      return {
        ...state,
        [action.data.viewerId]: {
          ...state[action.data.viewerId],
          instances: newInstances,
        },
      };
    }
    case REMOVE_VIEWER:
    {
      const { [action.data.viewerId]: toRemove, ...others } = state;
      return {
        ...others,
      };
    }

    default:
      return state;
  }
};

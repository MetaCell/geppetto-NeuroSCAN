// import CameraControls from '@metacell/geppetto-meta-ui/camera-controls/CameraControls';
import CameraControls from '../../components/Chart/CameraControls';

import {
  ADD_INSTANCES_VIEWER, ADD_VIEWER, COLOR_INSTANCES_VIEWER,
  REMOVE_VIEWER, UPDATE_SELECTED_INSTANCES,
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
  // position: {
  //   x: 21193.367052162743,
  //   y: 11233.635269974688,
  //   z: 25057.181362770185,
  // },
  // rotation: {
  //   rx: 0.2715855565097087,
  //   ry: 0.408670072792313,
  //   rz: -0.03861630889481375,
  //   radius: 0.9,
  // },
  // eyeLength: 11784.137953749936,
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
          cameraOptions: {
            ...defaultCameraOptions,
          },
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
    case UPDATE_SELECTED_INSTANCES:
    {
      const newInstances = state[action.data.viewerId].instances.map((instance) => {
        if (action.data.selectedInstances.find((x) => x === instance.uid)) {
          return {
            ...instance,
            selected: !instance.selected,
          };
        }
        return {
          ...instance,
          selected: false,
        };
      });
      return {
        ...state,
        [action.data.viewerId]: {
          ...state[action.data.viewerId],
          instances: newInstances,
        },
      };
    }

    default:
      return state;
  }
};

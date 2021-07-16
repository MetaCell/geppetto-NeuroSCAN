import {
  ADD_INSTANCES_VIEWER, ADD_VIEWER, COLOR_INSTANCES_VIEWER, REMOVE_VIEWER,
} from '../actions/viewers';

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
        },
      };
    }
    case ADD_INSTANCES_VIEWER:
    {
      return {
        ...state,
        [action.data.viewerId]: {
          instances: [...state[action.data.viewerId].instances, ...action.data.instances],
        },
      };
    }
    case COLOR_INSTANCES_VIEWER:
    {
      const instancesColorMap = new Map(action.data.instances.map((i) => [i, true]));
      const newInstances = state[action.data.viewerId].instances.map((item) => {
        if (instancesColorMap.get(item.instancePath)) {
          return {
            ...item,
            color: action.data.color,
          };
        }
        return { ...item };
      });
      return {
        ...state,
        [action.data.viewerId]: {
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

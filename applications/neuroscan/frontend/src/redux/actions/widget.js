export const ADD_INSTANCES = 'ADD_INSTANCES';

export const addInstances = ((widget, instances) => ({
  type: ADD_INSTANCES,
  widget,
  instances,
}));

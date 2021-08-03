export const ADD_INSTANCES = 'ADD_INSTANCES';

export const addInstances = ((instances) => ({
  type: ADD_INSTANCES,
  data: instances,
}));

export const ADD_INSTANCES = 'ADD_INSTANCES';
export const ADD_INSTANCES_TO_GROUP = 'ADD_INSTANCES_TO_GROUP';
export const SET_INSTANCES_COLOR = 'SET_INSTANCES_COLOR';

export const addInstances = ((viewerId, instances) => ({
  type: ADD_INSTANCES,
  viewerId,
  instances,
}));

export const addInstancesToGroup = ((viewerId, instances, group) => ({
  type: ADD_INSTANCES_TO_GROUP,
  viewerId,
  instances,
  group,
}));

export const setInstancesColor = ((viewerId, instances, color) => ({
  type: SET_INSTANCES_COLOR,
  viewerId,
  instances,
  color,
}));

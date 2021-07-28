export const ADD_VIEWER = 'ADD_VIEWER';
export const ADD_INSTANCES_VIEWER = 'ADD_INSTANCES_VIEWER';
export const COLOR_INSTANCES_VIEWER = 'COLOR_INSTANCES_VIEWER';
export const REMOVE_VIEWER = 'REMOVE_VIEWER';

export const addViewer = ((type, instances = []) => ({
  type: ADD_VIEWER,
  data: { type, instances },
}));

export const addInstancesViewer = ((viewerId, instances) => ({
  type: ADD_INSTANCES_VIEWER,
  data: { viewerId, instances },
}));

export const colorInstancesViewer = ((viewerId, instances, color) => ({
  type: COLOR_INSTANCES_VIEWER,
  data: { viewerId, instances, color },
}));

export const removeViewer = ((viewerId) => ({
  type: REMOVE_VIEWER,
  data: viewerId,
}));

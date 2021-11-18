export const ADD_INSTANCES = 'ADD_INSTANCES';
export const ADD_INSTANCES_TO_GROUP = 'ADD_INSTANCES_TO_GROUP';
export const SET_INSTANCES_COLOR = 'SET_INSTANCES_COLOR';
export const UPDATE_TIMEPOINT_VIEWER = 'UPDATE_TIMEPOINT_VIEWER';
export const UPDATE_BACKGROUND_COLOR_VIEWER = 'UPDATE_BACKGROUND_COLOR_VIEWER';
export const UPDATE_WIDGET_CONFIG = 'UPDATE_WIDGET_CONFIG';
export const UPDATE_VIEWER_ROTATE = 'UPDATE_VIEWER_ROTATE';

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

export const updateTimePointViewer = ((viewerId, timePoint) => ({
  type: UPDATE_TIMEPOINT_VIEWER,
  viewerId,
  timePoint,
}));

export const updateBackgroundColorViewer = ((viewerId, backgroundColor) => ({
  type: UPDATE_BACKGROUND_COLOR_VIEWER,
  viewerId,
  backgroundColor,
}));

export const updateWidgetConfig = ((viewerId, config) => ({
  type: UPDATE_WIDGET_CONFIG,
  viewerId,
  config,
}));

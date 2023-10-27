export const ADD_INSTANCES = 'ADD_INSTANCES';
export const ADD_CPHATE = 'ADD_CPHATE';
export const ADD_INSTANCES_TO_GROUP = 'ADD_INSTANCES_TO_GROUP';
export const SET_INSTANCES_COLOR = 'SET_INSTANCES_COLOR';
export const UPDATE_TIMEPOINT_VIEWER = 'UPDATE_TIMEPOINT_VIEWER';
export const UPDATE_BACKGROUND_COLOR_VIEWER = 'UPDATE_BACKGROUND_COLOR_VIEWER';
export const UPDATE_WIDGET_CONFIG = 'UPDATE_WIDGET_CONFIG';
export const UPDATE_VIEWER_ROTATE = 'UPDATE_VIEWER_ROTATE';
export const ROTATE_START_ALL = 'ROTATE_START_ALL';
export const ROTATE_STOP_ALL = 'ROTATE_STOP_ALL';
export const INVERT_COLORS_FLASHING = 'INVERT_COLORS_FLASHING';
export const SET_ORIGINAL_COLORS_FLASHING = 'SET_ORIGINAL_COLORS_FLASHING';
export const TOGGLE_INSTANCE_HIGHLIGHT = 'TOGGLE_INSTANCE_HIGHLIGHT';
export const ADD_LAST_SELECTED_INSTANCE = 'ADD_LAST_SELECTED_INSTANCE';

export const addInstances = ((viewerId, instances, viewerType = null) => ({
  type: ADD_INSTANCES,
  viewerId,
  viewerType,
  instances,
}));

export const addCphate = ((timePoint) => ({
  type: ADD_CPHATE,
  timePoint,
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

export const rotateStartAll = (() => ({
  type: ROTATE_START_ALL,
}));

export const rotateStopAll = (() => ({
  type: ROTATE_STOP_ALL,
}));

export const invertColorsFlashing = ((viewerId, uids) => ({
  type: INVERT_COLORS_FLASHING,
  viewerId,
  uids,
}));

export const setOriginalColors = ((viewerId, uids) => ({
  type: SET_ORIGINAL_COLORS_FLASHING,
  viewerId,
  uids,
}));

export const toggleInstanceHighlight = (viewerId, optionName) => ({
  type: TOGGLE_INSTANCE_HIGHLIGHT,
  payload: { viewerId, optionName },
});
export const addLastSelectedInstance = ((viewerId, uid) => ({
  type: ADD_LAST_SELECTED_INSTANCE,
  viewerId,
  uid,
}));

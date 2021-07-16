export const ADD_DEVSTAGE = 'ADD_DEVSTAGE';

export const addDevStages = ((devStages) => ({
  type: ADD_DEVSTAGE,
  data: devStages,
}));

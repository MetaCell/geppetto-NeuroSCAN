export const ADD_DEVSTAGES = 'ADD_DEVSTAGES';
export const RECEIVED_DEVSTAGES = 'RECEIVED_DEVSTAGES';

export const addDevStages = (() => ({
  type: ADD_DEVSTAGES,
}));

export const receivedDevStages = ((stages) => ({
  type: RECEIVED_DEVSTAGES,
  data: stages,
}));

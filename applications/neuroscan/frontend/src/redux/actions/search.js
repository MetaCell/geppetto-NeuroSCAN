export const UPDATE_FILTERS = 'UPDATE_FILTERS';
export const UPDATE_RESULTS = 'UPDATE_RESULTS';
export const UPDATE_COUNTERS = 'UPDATE_COUNTERS';
export const START_SEARCH = 'START_SEARCH';
export const LOAD_MORE = 'LOAD_MORE';
export const SET_ALL = 'SET_ALL';
export const GET_ALL = 'GET_ALL';

export const updateFilters = (filter) => ({
  type: UPDATE_FILTERS,
  ...filter,
});

export const updateResults = (data) => ({
  type: UPDATE_RESULTS,
  data,
});

export const loadMore = (data) => ({
  type: LOAD_MORE,
  data,
});

export const getAll = (data) => ({
  type: GET_ALL,
  data,
});
export const setAll = (data) => ({
  type: SET_ALL,
  data,
});

export const updateCounters = (counters) => ({
  type: UPDATE_COUNTERS,
  counters,
});

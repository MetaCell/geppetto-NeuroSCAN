export const UPDATE_FILTERS = 'UPDATE_FILTERS';
export const UPDATE_RESULTS = 'UPDATE_RESULTS';
export const INIT_COUNTERS = 'INIT_COUNTERS';
export const UPDATE_COUNTERS = 'UPDATE_COUNTERS';
export const START_SEARCH = 'START_SEARCH';

export const updateFilters = (searchTerms, developmentalStage, synapsesFilter) => ({
  type: UPDATE_FILTERS,
  searchTerms,
  developmentalStage,
  synapsesFilter,
});

export const updateResults = ((data) => ({
  type: UPDATE_RESULTS,
  data,
}));

export const initCounters = (() => ({
  type: INIT_COUNTERS,
}));

export const updateCounters = ((counters) => ({
  type: UPDATE_COUNTERS,
  counters,
}));

export const UPDATE_FILTERS = 'UPDATE_FILTERS';
export const UPDATE_RESULTS = 'UPDATE_RESULTS';
export const UPDATE_TOTALS = 'UPDATE_TOTALS';
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

export const updateCounters = ((data) => ({
  type: UPDATE_TOTALS,
  data,
}));

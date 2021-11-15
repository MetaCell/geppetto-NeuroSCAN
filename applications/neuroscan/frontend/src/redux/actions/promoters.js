export const PROMOTERS_UPDATE_FILTERS = 'PROMOTERS_UPDATE_FILTERS';
export const PROMOTERS_LOAD_MORE = 'PROMOTERS_LOAD_MORE';
export const PROMOTERS_COUNT_RESULTS = 'PROMOTERS_COUNT_RESULTS';
export const PROMOTERS_UPDATE_RESULTS = 'PROMOTERS_UPDATE_RESULTS';

export const updateFilters = ((filters) => ({
  type: PROMOTERS_UPDATE_FILTERS,
  data: filters,
}));

export const loadMorePromoters = ((promoters) => ({
  type: PROMOTERS_LOAD_MORE,
  data: promoters,
}));

export const updatePromoters = ((promoters) => ({
  type: PROMOTERS_UPDATE_RESULTS,
  data: promoters,
}));

export const updateCount = ((count) => ({
  type: PROMOTERS_COUNT_RESULTS,
  data: count,
}));

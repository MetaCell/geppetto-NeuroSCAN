export const PROMOTERS_LOAD = 'PROMOTERS_LOAD';
export const PROMOTERS_UPDATE_RESULTS = 'PROMOTERS_UPDATE_RESULTS';

export const loadPromoters = ((promoters) => ({
  type: PROMOTERS_LOAD,
  data: promoters,
}));

export const updatePromoters = ((promoters) => ({
  type: PROMOTERS_UPDATE_RESULTS,
  data: promoters,
}));

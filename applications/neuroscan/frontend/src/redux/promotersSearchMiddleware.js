import * as search from './actions/promoters';
import doSearch from '../services/promoterHelpers';

const searchMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case search.PROMOTERS_UPDATE_FILTERS: {
      next(action);
      const state = store.getState();
      doSearch(store.dispatch, state.promoterDB);
      break;
    }

    case search.PROMOTERS_LOAD_MORE: {
      next({
        type: action.type,
      });
      const state = store.getState();
      doSearch(store.dispatch, state.promoterDB);
      break;
    }

    default:
      next(action);
  }
};

export default searchMiddleware;

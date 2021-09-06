import * as search from './actions/search';
import { doSearch, initCounters } from '../services/helpers';

const searchMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case search.UPDATE_FILTERS: {
      next(action);
      const state = store.getState();
      doSearch(store.dispatch, state.search.filters);
      break;
    }

    case search.INIT_COUNTERS: {
      next(action);
      initCounters(store.dispatch);
      break;
    }

    default:
      next(action);
  }
};

export default searchMiddleware;

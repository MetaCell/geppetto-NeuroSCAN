import * as search from './actions/search';
import { doSearch, initCounters } from '../services/helpers';

const searchMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case search.UPDATE_FILTERS: {
      next(action);
      const state = store.getState();
      doSearch(store.dispatch, state.search);
      break;
    }

    case search.LOAD_MORE: {
      const { entity } = action.data;
      next({
        type: action.type,
      });
      const state = store.getState();
      doSearch(store.dispatch, state.search, [entity]);
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

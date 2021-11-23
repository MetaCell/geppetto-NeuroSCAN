import * as search from './actions/search';
import doSearch from '../services/helpers';

const searchMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case search.UPDATE_FILTERS: {
      next(action);
      const state = store.getState();
      state.search.filters.timePoint = action.timePoint || state.search.filters.timePoint;
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

    default:
      next(action);
  }
};

export default searchMiddleware;

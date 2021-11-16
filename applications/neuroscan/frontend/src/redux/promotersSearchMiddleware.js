import * as search from './actions/promoters';
import doSearch from '../services/promoterHelpers';

const searchMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case search.PROMOTERS_LOAD: {
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

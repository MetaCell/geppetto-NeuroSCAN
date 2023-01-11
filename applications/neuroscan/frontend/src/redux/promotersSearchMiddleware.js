import * as search from './actions/promoters';
import { raiseError, loading, loadingSuccess } from './actions/misc';
import doSearch from '../services/promoterHelpers';

const searchMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case search.PROMOTERS_LOAD: {
      next({
        type: action.type,
      });
      const state = store.getState();
      const msg = 'Loading promoters';
      next(loading(msg, action.type));
      doSearch(store.dispatch, state.promoterDB).then(() => {
        next(loadingSuccess(msg, action.type));
      }, (e) => {
        next(raiseError(msg));
      });
      break;
    }

    default:
      next(action);
  }
};

export default searchMiddleware;

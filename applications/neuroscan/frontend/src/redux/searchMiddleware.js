import * as search from './actions/search';
import doSearch from '../services/helpers';
import cphateService from '../services/CphateService';
import { ADD_CPHATE, addInstances } from './actions/widget';
import { raiseError, loading, loadingSuccess } from './actions/misc';
import { VIEWERS } from '../utilities/constants';

const searchMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case search.UPDATE_FILTERS: {
      next(action);
      const state = store.getState();
      state.search.filters.timePoint = action.timePoint;
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

    case ADD_CPHATE: {
      const { timePoint } = action;
      const msg = 'Add cphate';
      next(loading(msg, action.type));
      cphateService
        .getCphateByTimepoint(timePoint)
        .then((cphate) => {
          if (cphate) {
            const cphateInstances = cphateService.getInstances(cphate);
            store.dispatch(addInstances(null, cphateInstances, VIEWERS.CphateViewer));
          }
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

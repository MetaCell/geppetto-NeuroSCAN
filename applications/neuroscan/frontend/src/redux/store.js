import { createStore } from '@metacell/geppetto-meta-client/common';
import baseLayout from '../components/layout/defaultLayout';
import componentMap from '../components/layout/componentMap';
import reducers from './reducers/all';
import middleware from './middleware';
import searchMiddleware from './searchMiddleware';

import { SEARCH_DEFAULT_STATUS } from './reducers/search';
import { DEVSTAGES_DEFAULT_STATUS } from './reducers/devStages';

const INIT_STATE = {
  devStages: DEVSTAGES_DEFAULT_STATUS,
  misc: {},
  search: SEARCH_DEFAULT_STATUS.search,
};

const store = createStore(
  reducers,
  INIT_STATE,
  [middleware, searchMiddleware],
  { baseLayout, componentMap },
);

export default store;

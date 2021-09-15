import { createStore } from '@metacell/geppetto-meta-client/common';
import baseLayout from '../components/layout/defaultLayout';
import componentMap from '../components/layout/componentMap';
import reducers from './reducers/all';
import middleware from './middleware';
import searchMiddleware from './searchMiddleware';

import { VIEWERS_DEFAULT_STATUS } from './reducers/viewers';
import { SEARCH_DEFAULT_STATUS } from './reducers/search';

const INIT_STATE = {
  viewers: VIEWERS_DEFAULT_STATUS,
  devStages: {},
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

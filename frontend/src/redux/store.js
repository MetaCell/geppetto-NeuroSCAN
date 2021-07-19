import { createStore } from '@metacell/geppetto-meta-client/common';
import baseLayout from '../components/layout/defaultLayout';
import componentMap from '../components/layout/componentMap';
import reducers from './reducers/all';
import middleware from './middleware';

const INIT_STATE = {
  viewers: {},
  devStages: {},
  misc: {},
};

const store = createStore(
  reducers,
  INIT_STATE,
  [middleware],
  { baseLayout, componentMap },
);

export default store;

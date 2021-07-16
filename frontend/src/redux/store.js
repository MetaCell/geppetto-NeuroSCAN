import { createStore } from '@metacell/geppetto-meta-client/common';
import baseLayout from '../components/layout/defaultLayout';
import componentMap from '../components/layout/componentMap';

const reducers = {};

const INIT_STATE = {
  viewers: {},
  devStages: {},
  layout: {},
};

const store = createStore(
  reducers,
  INIT_STATE,
  [],
  { baseLayout, componentMap },
);

export default store;

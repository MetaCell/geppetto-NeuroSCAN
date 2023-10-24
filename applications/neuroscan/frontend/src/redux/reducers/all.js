// import viewersReducer from './viewers';
import devStagesReducer from './devStages';
import searchReducer from './search';
import miscReducer from './misc';
import promoterReducer from './promoters';
import addedInstances from './addedInstances';

export default {
  // viewers: viewersReducer,
  devStages: devStagesReducer,
  misc: miscReducer,
  search: searchReducer,
  promoterDB: promoterReducer,
  selectedInstances: addedInstances,
};

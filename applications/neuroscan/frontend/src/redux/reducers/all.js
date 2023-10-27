// import viewersReducer from './viewers';
import devStagesReducer from './devStages';
import searchReducer from './search';
import miscReducer from './misc';
import promoterReducer from './promoters';
import selectedInstanceToDeleteReducer from './selectedInstanceToDelete';

export default {
  // viewers: viewersReducer,
  devStages: devStagesReducer,
  misc: miscReducer,
  search: searchReducer,
  promoterDB: promoterReducer,
  selectedInstanceToDelete: selectedInstanceToDeleteReducer,
};

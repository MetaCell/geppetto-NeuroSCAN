import { combineReducers } from 'redux';
import viewers from './viewers';
import devStage from './devStages';
import misc from './misc';

export default combineReducers({
  viewers,
  devStage,
  misc,
});

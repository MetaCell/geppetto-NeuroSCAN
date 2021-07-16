import { combineReducers } from 'redux';
import viewers from './viewers';
import devStage from './devStages';

export default combineReducers({
  viewers,
  devStage,
});

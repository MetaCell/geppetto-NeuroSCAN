/* eslint-disable import/no-cycle */
import { connect } from 'react-redux';
import Viewer from './viewer';
import { canvasUpdateStarted, canvasUpdateEnded } from '../../redux/actions/misc';

const InstanceViewer = connect(
  null,
  (dispatch) => ({
    loadingStarted: () => dispatch(canvasUpdateStarted()),
    loadingFinished: () => dispatch(canvasUpdateEnded()),
  }),
)(Viewer);

export default InstanceViewer;

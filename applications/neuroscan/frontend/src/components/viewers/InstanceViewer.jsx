/* eslint-disable import/no-cycle */
import { connect } from 'react-redux';
import Viewer from './viewer';
import { canvasUpdateStarted, canvasUpdateEnded } from '../../redux/actions/misc';
import { addInstances } from '../../redux/actions/widget';
import { VIEWERS } from '../../utilities/constants';

const InstanceViewer = connect(
  null,
  (dispatch) => ({
    loadingStarted: () => dispatch(canvasUpdateStarted()),
    loadingFinished: () => dispatch(canvasUpdateEnded()),
    addInstancesToViewer: (viewerId, instances, timepoint) => dispatch(
      addInstances(viewerId, instances, VIEWERS.InstanceViewer, timepoint),
    ),
  }),
)(Viewer);

export default InstanceViewer;

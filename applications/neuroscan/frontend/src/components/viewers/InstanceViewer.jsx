/* eslint-disable import/no-cycle */
import { connect } from 'react-redux';
import Viewer from './viewer';
import { canvasUpdateStarted, canvasUpdateEnded } from '../../redux/actions/misc';
import { addInstances, cloneViewerWithInstancesList } from '../../redux/actions/widget';
import { VIEWERS } from '../../utilities/constants';

const InstanceViewer = connect(
  null,
  (dispatch) => ({
    loadingStarted: () => dispatch(canvasUpdateStarted()),
    loadingFinished: () => dispatch(canvasUpdateEnded()),
    addInstancesToViewer: (viewerId, instances) => dispatch(
      addInstances(viewerId, instances, VIEWERS.InstanceViewer),
    ),
    cloneViewerWithInstancesList: (viewerId, instances) => dispatch(
      cloneViewerWithInstancesList(viewerId, instances),
    ),
  }),
)(Viewer);

export default InstanceViewer;

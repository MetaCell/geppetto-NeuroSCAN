/* eslint-disable import/no-cycle */
import { connect } from 'react-redux';
import Viewer from './viewer';
import { updateWidgetConfig } from '../../redux/actions/widget';

const InstanceViewer = connect(
  null,
  (dispatch) => ({
    updateWidget: (id, config) => dispatch(updateWidgetConfig(id, config)),
  }),
)(Viewer);

export default InstanceViewer;

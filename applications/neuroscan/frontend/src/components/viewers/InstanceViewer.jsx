/* eslint-disable import/no-cycle */
import { connect } from 'react-redux';
import Viewer from './viewer';

const InstanceViewer = connect(
  null,
)(Viewer);

export default InstanceViewer;

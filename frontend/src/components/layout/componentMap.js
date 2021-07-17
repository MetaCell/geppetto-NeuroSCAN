import { VIEWERS } from '../../constants';
import MorphologyViewer from '../viewers/MorphologyViewer';
import CphateViewer from '../viewers/CphateViewer';

const componentMap = {
  [VIEWERS.MorphologyViewer]: MorphologyViewer,
  [VIEWERS.CphateViewer]: CphateViewer,

};

export default componentMap;

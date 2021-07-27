import { VIEWERS } from '../../utilities/constants';
import CphateViewer from '../viewers/CphateViewer';
import MorphologyViewer from '../viewers/MorphologyViewer';

const componentMap = {
  [VIEWERS.MorphologyViewer]: MorphologyViewer,
  [VIEWERS.CphateViewer]: CphateViewer,
};

export default componentMap;

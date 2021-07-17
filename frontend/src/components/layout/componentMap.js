import { VIEWERS } from '../../constants';
import MorphologyViewer from '../viewers/MorphologyViewer';
import CphateViewer from '../viewers/CphateViewer';
import ViewerPlaceholder from '../ViewerPlaceholder';

const componentMap = {
  [VIEWERS.MorphologyViewer]: MorphologyViewer,
  [VIEWERS.CphateViewer]: CphateViewer,
  placeholderViewer: ViewerPlaceholder,

};

export default componentMap;

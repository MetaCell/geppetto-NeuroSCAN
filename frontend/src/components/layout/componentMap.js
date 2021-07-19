import { VIEWERS } from '../../constants';
import CphateViewer from '../viewers/CphateViewer';
import ViewerPlaceholder from '../ViewerPlaceholder';
import MorphologyViewer from '../viewers/MorphologyViewer';

const componentMap = {
  [VIEWERS.MorphologyViewer]: MorphologyViewer,
  [VIEWERS.CphateViewer]: CphateViewer,
  placeholderViewer: ViewerPlaceholder,

};

export default componentMap;

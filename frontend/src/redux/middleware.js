import { addWidget } from '@metacell/geppetto-meta-client/common/layout/actions';
import { WidgetStatus } from '@metacell/geppetto-meta-client/common/layout/model';
import { v4 as uuidv4 } from 'uuid';
import { ADD_VIEWER } from './actions/viewers';

const middleware = (store) => (next) => (action) => {
  function widgetFromViewerSpec(viewerSpec) {
    return {
      id: viewerSpec.viewerId,
      name: `${viewerSpec.type}_${viewerSpec.viewerId}`,
      component: viewerSpec.type,
      panelName: 'centralPanel',
      enableClose: true,
      enableRename: true,
      enableDrag: true,
      status: WidgetStatus.ACTIVE,
      config: {},
    };
  }

  switch (action.type) {
    case ADD_VIEWER: {
      // eslint-disable-next-line no-param-reassign
      action.data.viewerId = uuidv4();
      store.dispatch(addWidget(widgetFromViewerSpec(action.data)));
      break;
    }

    default:
      next(action);
  }
};

export default middleware;

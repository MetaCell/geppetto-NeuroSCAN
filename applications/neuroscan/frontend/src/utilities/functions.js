import { v4 as uuidv4 } from 'uuid';
import { WidgetStatus } from '@metacell/geppetto-meta-client/common/layout/model';
import { addWidget, updateWidget } from '@metacell/geppetto-meta-client/common/layout/actions';
import { VIEWERS } from './constants';
import { defaultCameraOptions } from './defaults';

// flatten the tree to an flat array
export const flatten = (children, extractChildren) => Array.prototype.concat.apply(
  children,
  children.map((x) => flatten(x.children || [], extractChildren)),
);

// we use widgets for creating the viewer list
// see https://github.com/MetaCell/geppetto-meta/issues/161
// why the name of the viewer isn't changed after
// the name of the tab is changed
export const getViewersFromWidgets = (widgets) => {
  const viewers = [];
  Object.values(widgets).forEach((item) => {
    if (item.component === VIEWERS.InstanceViewer) {
      viewers.push(item);
    }
  });
  return viewers;
};

export const widgetFromViewerSpec = (viewerSpec) => ({
  id: viewerSpec.viewerId,
  name: `${viewerSpec.type}_${viewerSpec.viewerId}`,
  component: viewerSpec.type,
  panelName: 'centralPanel',
  enableClose: true,
  enableRename: true,
  enableDrag: true,
  status: WidgetStatus.ACTIVE,
  config: {
    ...viewerSpec,
  },
});

export const addToWidget = (
  dispatch,
  widget = null,
  instances,
) => {
  if (widget === null) {
    const newWidget = {
      type: VIEWERS.InstanceViewer,
      instances,
      cameraOptions: defaultCameraOptions,
      viewerId: uuidv4(),
    };
    dispatch(addWidget(widgetFromViewerSpec(newWidget)));
  } else {
    const newWidget = {
      ...widget,
      status: WidgetStatus.ACTIVE,
      config: {
        ...widget.config,
        instances: widget.config.instances.concat(instances),
      },
    };
    dispatch(updateWidget(newWidget));
  }
};

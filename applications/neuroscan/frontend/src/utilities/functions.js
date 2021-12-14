/* eslint-disable import/no-cycle */
import { v4 as uuidv4 } from 'uuid';
import { WidgetStatus } from '@metacell/geppetto-meta-client/common/layout/model';
import { addWidget, updateWidget } from '@metacell/geppetto-meta-client/common/layout/actions';
import CaptureControls from '../components/Chart/capture-menu/CaptureControls';
import { VIEWERS, CANVAS_BACKGROUND_COLOR_DARK } from './constants';
import CameraControls, { cameraControlsRotateState } from '../components/Chart/CameraControls';

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
    if ((item.component === VIEWERS.InstanceViewer)
     || (item.component === VIEWERS.CphateViewer)) {
      viewers.push(item);
    }
  });
  return viewers;
};

export const widgetFromViewerSpec = (viewerSpec) => ({
  id: viewerSpec.viewerId,
  name: viewerSpec.name,
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
  widget = null,
  instances,
  cleanInstances = false,
) => {
  if (widget.id === null) {
    const newViewerId = uuidv4();
    const newWidget = {
      type: widget.type,
      cameraOptions: {
        angle: 50,
        near: 0.01,
        far: 1000,
        baseZoom: 1,
        cameraControls: {
          instance: CameraControls,
          props: {
            wireframeButtonEnabled: false,
            viewerId: newViewerId,
          },
        },
        reset: false,
        autorotate: false,
        wireframe: false,
        depthWrite: false,
      },
      captureOptions: {
        captureControls: {
          instance: CaptureControls,
          props: {
            widgetName: widget.name,
            viewerId: newViewerId,
          },
        },
        recorderOptions: {
          mediaRecorderOptions: {
            mimeType: 'video/webm;codecs=h264',
          },
          blobOptions: {
            type: 'video/mp4',
          },
        },
        screenshotOptions: {
          resolution: {
            width: 3840,
            height: 2160,
          },
          quality: 0.95,
          pixelRatio: 1,
          filter: () => true,
        },
      },
      viewerId: newViewerId,
      flash: false,
      timePoint: widget.timePoint,
      name: widget.name,
      rotate: cameraControlsRotateState.STOP,
      backgroundColor: CANVAS_BACKGROUND_COLOR_DARK,
      instances,
    };
    return addWidget(widgetFromViewerSpec(newWidget));
  }
  const newWidget = {
    ...widget,
    status: WidgetStatus.ACTIVE,
    config: {
      ...widget.config,
      instances: cleanInstances ? instances : widget.config.instances.concat(instances),
    },
  };
  return updateWidget(newWidget);
};

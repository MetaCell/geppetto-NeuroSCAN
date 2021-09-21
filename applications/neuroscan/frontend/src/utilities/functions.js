import { v4 as uuidv4 } from 'uuid';
import { WidgetStatus } from '@metacell/geppetto-meta-client/common/layout/model';
import { addWidget, updateWidget } from '@metacell/geppetto-meta-client/common/layout/actions';
import { defaultCameraOptions } from './defaults';
import { createSimpleInstancesFromInstances } from '../services/helpers';
import {
  VIEWERS,
  filesURL,
  NEURON_TYPE, CONTACT_TYPE, SYNAPSE_TYPE,
} from './constants';

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

export const instanceEqualsInstance = (instanceA, instanceB) => instanceA.uid === instanceB.uid
  && instanceA.instanceType === instanceB.instanceType;

export const setInstanceSelected = (instances, selectedUids) => instances.map((instance) => {
  let selected = false;
  if (selectedUids.find((x) => x === instance.uid)) {
    selected = !instance.selected;
  }
  return {
    ...instance,
    selected,
  };
});

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

export const addToWidget = async (
  widget = null,
  instances,
) => createSimpleInstancesFromInstances(instances)
  .then(() => {
    let newWidget = widget;
    if (newWidget === null) {
      newWidget = {
        type: VIEWERS.InstanceViewer,
        instances,
        cameraOptions: defaultCameraOptions,
        viewerId: uuidv4(),
      };
      return addWidget(widgetFromViewerSpec(newWidget));
    }
    newWidget.status = WidgetStatus.ACTIVE;
    newWidget.config.instances = widget.config.instances.concat(instances);
    return updateWidget(newWidget);
  });

export const getDevStageFromTimepoint = (timepoint) => {
  // TODO: implement logic to determine the devstage from the timepoint
  const devStage = 'L4_JSH';
  return devStage;
};

export const getLocationPrefixFromType = (item) => {
  const devStage = getDevStageFromTimepoint(item.timepoint);
  switch (item.instanceType) {
    case NEURON_TYPE: {
      return `${filesURL}/neuroscan/${devStage}/${item.timepoint}/neurons/${item.filename}`;
    }
    case CONTACT_TYPE: {
      return `${filesURL}/neuroscan/${devStage}/${item.timepoint}/contacts/${item.filename}`;
    }
    case SYNAPSE_TYPE: {
      return `${filesURL}/neuroscan/${devStage}/${item.timepoint}/synapses/${item.filename}`;
    }
    default: {
      return '';
    }
  }
};

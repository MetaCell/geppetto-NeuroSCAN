/* eslint-disable import/no-cycle */
import SimpleInstance from '@metacell/geppetto-meta-core/model/SimpleInstance';
import { updateWidgetConfig } from '../redux/actions/widget';
import urlService from './UrlService';
import zipService from './ZipService';
import store from '../redux/store';
import {
  filesURL,
  NEURON_TYPE, CONTACT_TYPE, SYNAPSE_TYPE,
} from '../utilities/constants';

export const instanceEqualsInstance = (instanceA, instanceB) => instanceA.uid === instanceB.uid
  && instanceA.instanceType === instanceB.instanceType;

export const invertColor = ({
  r, g, b, a,
}) => ({
  r: 1 - r, g: 1 - g, b: 1 - b, a,
});

export const invertColorSelectedInstances = (instances) => (
  instances
    .map((instance) => ({
      ...instance,
      color: instance.selected ? invertColor(instance.color) : instance.color,
    }))
);

export const setOriginalColorSelectedInstances = (instances) => (
  instances
    .map((instance) => ({
      ...instance,
      color: instance.colorOriginal ? instance.colorOriginal : instance.color,
    }))
);

const updateInstanceSelected = (instances, selectedUids) => instances.map((instance) => {
  if (selectedUids.find((x) => x === instance.uid)) {
    return {
      ...instance,
      selected: true,
      colorOriginal: instance.color,
      color: invertColor(instance.color),
    };
  }
  return {
    ...instance,
    selected: false,
  };
});

export const setSelectedInstances = (viewerId, instances, selectedUids) => {
  store.dispatch(updateWidgetConfig(
    viewerId, {
      flash: true,
      instances: updateInstanceSelected(
        instances, selectedUids,
      ),
    },
  ));
};

export const updateInstanceGroup = (instances, instanceList, newGroup = null) => instances
  .map((instance) => {
    if (instanceList.find((x) => x.uid === instance.uid)) {
      return {
        ...instance,
        group: newGroup === instance.group ? null : newGroup,
      };
    }
    return {
      ...instance,
    };
  });

export const setInstancesColor = (instances, instanceList, newColor = null) => instances
  .map((instance) => {
    if (instanceList.find((x) => x.uid === instance.uid)) {
      return {
        ...instance,
        color: newColor,
      };
    }
    return {
      ...instance,
    };
  });

const getDevStageFromTimepoint = (timepoint) => {
  const state = store.getState();
  const devStage = state.devStages.neuroSCAN
    .find((stage) => stage.timepoints !== null
      && stage.timepoints.includes(`${timepoint}`));
  return devStage.name;
};

const getLocationPrefixFromType = (item) => {
  const devStage = getDevStageFromTimepoint(item.timepoint);
  switch (item.instanceType) {
    case NEURON_TYPE: {
      return `${filesURL}/neuroscan/${devStage}/${item.timepoint}/neurons/${item.filename}`;
    }
    case CONTACT_TYPE: {
      return `${filesURL}/neuroscan/${devStage}/${item.timepoint}/contacts/${item.neuronA.uid}/${item.filename}`;
    }
    case SYNAPSE_TYPE: {
      let folder = '';
      switch (item.position) {
        case 'post':
          folder = `${item.postNeuron?.uid}_PostSyn`;
          break;

        case 'pre':
          folder = `${item.neuronPre?.uid}_PreSyn`;
          break;

        default:
          folder = '';
      }
      return `${filesURL}/neuroscan/${devStage}/${item.timepoint}/synapses/${folder}/${item.filename}`;
    }
    default: {
      return '';
    }
  }
};

export const mapToInstance = (item) => {
  const fileName = item.filename || '';
  const location = getLocationPrefixFromType(item);
  return {
    id: item.id,
    uid: `i_${item.uid.replace(/-/g, '_')}_${item.timepoint}`,
    uidFromDb: item.uid,
    name: item.name,
    selected: false,
    color: {
      r: Math.random(), g: Math.random(), b: Math.random(), a: 1,
    },
    instanceType: item.instanceType,
    group: null,
    content: {
      type: 'url',
      location,
      fileName,
    },
    getId: () => this.id,
  };
};

const getContentService = (content) => {
  switch (content.type.toLowerCase()) {
    case 'zip':
      return zipService;
    default:
      return urlService;
  }
};

const createSimpleInstance = async (instance) => {
  const { content } = instance;

  // TODO: uncomment line below, for testing purpose always add sphere.obj
  const contentService = getContentService(content);
  // TODO: and remove these 3 lines
  // const contentService = urlService;
  // content.fileName = 'sphere.obj';
  // content.location = `${filesURL}/../uploads/${content.fileName}`;

  const base64Content = await contentService.getBase64(content.location, content.fileName);

  let visualValue;
  const fileExtension = content.fileName.split('.').pop().toLowerCase();
  switch (fileExtension) {
    case 'obj':
      visualValue = {
        eClass: window.GEPPETTO.Resources.OBJ,
        obj: base64Content,
      };
      break;
    case 'gltf':
      visualValue = {
        eClass: window.GEPPETTO.Resources.GLTF,
        gltf: base64Content,
      };
      break;
    default:
      visualValue = {
        eClass: window.GEPPETTO.Resources.OBJ,
        obj: base64Content,
      };
  }

  return new SimpleInstance({
    eClass: 'SimpleInstance',
    id: instance.uid,
    name: instance.uid,
    type: { eClass: 'SimpleType' },
    visualValue,
  });
};

const removeDuplicates = (arr) => arr.filter(
  (v, i, a) => {
    const x = a.findIndex((t) => (t.getId() === v.getId()));
    return x === i;
  },
);

export const createSimpleInstancesFromInstances = (instances) => {
  // filter out already existing instances
  const newInstances = instances.filter(
    (instance) => !window.Instances.find((i) => i.wrappedObj.id === instance.uid),
  );
  return Promise.all(
    // create geppetto simple instances from the instances
    newInstances.map((instance) => createSimpleInstance(instance)),
  ).then((newSimpleInstances) => {
    // add the new simple instances to geppetto
    window.Instances = removeDuplicates([...window.Instances, ...newSimpleInstances]);
    window.GEPPETTO.Manager.augmentInstancesArray(window.Instances);
  });
};

export const getGroupsFromInstances = (instances) => (
  [
    ...new Set(
      instances
        .filter((instance) => instance.group)
        .map((instance) => instance.group),
    ),
  ]);

const groupBy = (items, key) => items
  .filter((item) => item[key] !== null)
  .reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [
        ...(result[item[key]] || []),
        item,
      ],
    }),
    {},
  );

export const getInstancesOfType = (instances, instanceType) => (
  groupBy(instances, 'instanceType'))[instanceType];

export const getInstancesByGroups = (instances) => (
  groupBy(instances, 'group'));

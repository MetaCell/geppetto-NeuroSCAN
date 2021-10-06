import SimpleInstance from '@metacell/geppetto-meta-core/model/SimpleInstance';
import urlService from './UrlService';
import zipService from './ZipService';
import { colorDefault } from '../utilities/defaults';
// eslint-disable-next-line import/no-cycle
import store from '../redux/store';
import {
  filesURL,
  NEURON_TYPE, CONTACT_TYPE, SYNAPSE_TYPE,
} from '../utilities/constants';

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

export const mapToInstance = (item) => {
  const fileName = item.filename || '';
  const location = getLocationPrefixFromType(item);
  return {
    id: item.id,
    uid: `i${item.uid.replace(/-/g, '')}`,
    name: item.uid,
    selected: false,
    color: colorDefault,
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

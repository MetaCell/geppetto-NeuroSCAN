import SimpleInstance from '@metacell/geppetto-meta-core/model/SimpleInstance';
import urlService from './UrlService';
import zipService from './ZipService';

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
  const contentService = getContentService(content);

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

const updateGeppettoInstances = (newSimpleInstances) => {
  window.Instances = removeDuplicates([...window.Instances, ...newSimpleInstances]);
  window.GEPPETTO.Manager.augmentInstancesArray(window.Instances);
};

/* eslint-disable import/prefer-default-export */
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
    updateGeppettoInstances(newSimpleInstances);
  });
};

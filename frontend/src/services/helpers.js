import SimpleInstance from '@metacell/geppetto-meta-core/model/SimpleInstance';
import { backendURL } from '../utilities/constants';
import { getBase64, isValidHttpUrl } from '../utilities/functions';
import { Contact, Neuron } from '../rest';

const createSimpleInstance = async (instance) => {
  const file = instance.files[0];
  const url = isValidHttpUrl(file) ? file : `${backendURL}${file}`;

  const base64 = await getBase64(url);

  let visualValue = null;
  switch (true) {
    case instance instanceof Neuron:
      visualValue = {
        eClass: window.GEPPETTO.Resources.GLTF,
        gltf: base64,
      };
      break;
    case instance instanceof Contact:
      visualValue = {
        eClass: window.GEPPETTO.Resources.GLTF,
        gltf: base64,
      };
      break;
    default:
      visualValue = {
        eClass: window.GEPPETTO.Resources.OBJ,
        obj: base64,
      };
  }

  const simpleInstance = {
    eClass: 'SimpleInstance',
    id: instance.uid,
    name: instance.uid,
    type: { eClass: 'SimpleType' },
    visualValue,
  };
  return new SimpleInstance(simpleInstance);
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

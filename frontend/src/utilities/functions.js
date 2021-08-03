import { useState } from 'react';
import SimpleInstance from '@metacell/geppetto-meta-core/model/SimpleInstance';
import { backendURL } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const useConstructor = (callBack = () => {}) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) return;
  callBack();
  setHasBeenCalled(true);
};

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
}

const getBase64 = (url) => fetch(url)
  .then((response) => response.text())
  .then((text) => `data:model/obj;base64,${btoa(text)}`);

const createSimpleInstance = async (resourceType, instance) => {
  const file = instance.files[0];
  const url = isValidHttpUrl(file) ? file : `${backendURL}${file}`;

  const base64 = await getBase64(url);
  const simpleInstance = {
    eClass: 'SimpleInstance',
    id: instance.uid,
    name: instance.uid,
    type: { eClass: 'SimpleType' },
    visualValue: {
      eClass: resourceType,
    },
  };
  if (resourceType === window.GEPPETTO.Resources.OBJ) {
    simpleInstance.visualValue.obj = base64;
  } else {
    simpleInstance.visualValue.gltf = base64;
  }
  return new SimpleInstance(simpleInstance);
};

export const createSimpleObjInstance = (instance) => createSimpleInstance(
  window.GEPPETTO.Resources.OBJ, instance,
);

export const createSimpleGltfInstance = (instance) => createSimpleInstance(
  window.GEPPETTO.Resources.GLTF, instance,
);

const removeDuplicates = (arr) => arr.filter(
  (v, i, a) => {
    const x = a.findIndex((t) => (t.getId() === v.getId()));
    return x === i;
  },
);

export const updateGeppettoInstances = (newInstances) => {
  window.Instances = removeDuplicates([...window.Instances, ...newInstances]);
  window.GEPPETTO.Manager.augmentInstancesArray(window.Instances);
};

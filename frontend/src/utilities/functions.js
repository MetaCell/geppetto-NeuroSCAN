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

const getBase64 = async (url) => {
  const response = await window.fetch(url);
  const blob = await response.blob();
  const reader = new FileReader();
  await new Promise((resolve, reject) => {
    reader.onload = resolve;
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
  return reader.result;
};

export const createSimpleInstance = async (instance) => {
  const gltfBase64 = await getBase64(`${backendURL}${instance.file}`);

  return new SimpleInstance({
    eClass: 'SimpleInstance',
    id: instance.uid,
    name: instance.uid,
    type: { eClass: 'SimpleType' },
    visualValue: {
      eClass: window.GEPPETTO.Resources.GLTF,
      gltf: gltfBase64,
    },
  });
};

const removeDuplicates = (arr) => arr.filter(
  (v, i, a) => a.findIndex((t) => (t.getId() === v.getId())) === i,
);

export const updateGeppettoInstances = (newInstances) => {
  window.Instances = removeDuplicates([...window.Instances, ...newInstances]);
  window.GEPPETTO.Manager.augmentInstancesArray(window.Instances);
};

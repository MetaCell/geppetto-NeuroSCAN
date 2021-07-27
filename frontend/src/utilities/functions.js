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
  const file = instance.files[0];
  const url = isValidHttpUrl(file) ? file : `${backendURL}${file}`;
  const gltfBase64 = await getBase64(url);

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

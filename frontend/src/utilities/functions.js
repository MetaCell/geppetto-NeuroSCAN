import { useState } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const useConstructor = (callBack = () => {}) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) return;
  callBack();
  setHasBeenCalled(true);
};

export const createSimpleInstance = (instance) => ({
  eClass: 'SimpleInstance',
  id: instance.id,
  name: instance.uid,
  type: { eClass: 'SimpleType' },
  visualValue: {
    eClass: 'GLTF',
    gltf: instance.file,
  },
});

const removeDuplicates = (arr) => arr.filter(
  (v, i, a) => a.findIndex((t) => (t.id === v.id)) === i,
);

export const updateGeppettoInstances = (newInstances) => {
  window.Instances = removeDuplicates([...window.Instances, ...newInstances]);
  window.GEPPETTO.Manager.augmentInstancesArray(window.Instances);
};

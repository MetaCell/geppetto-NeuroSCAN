import { useState } from 'react';
import { useSelector } from 'react-redux';
import { VIEWERS } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const useConstructor = (callBack = () => {}) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) return;
  callBack();
  setHasBeenCalled(true);
};

// flatten the tree to an flat array
export const flatten = (children, extractChildren) => Array.prototype.concat.apply(
  children,
  children.map((x) => flatten(x.children || [], extractChildren)),
);

export const getViewersFromLayout = (layout) => flatten(layout)
  .filter((x) => x.component === VIEWERS.InstanceViewer);

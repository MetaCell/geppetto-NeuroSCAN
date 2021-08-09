import { useState } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const useConstructor = (callBack = () => {}) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) return;
  callBack();
  setHasBeenCalled(true);
};

export const isValidHttpUrl = (string) => {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
};

export const getBase64 = (url) => fetch(url)
  .then((response) => response.text())
  .then((text) => `data:model/obj;base64,${btoa(text)}`);

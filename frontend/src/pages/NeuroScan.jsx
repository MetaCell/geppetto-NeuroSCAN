import React, { useEffect } from 'react';
import BigImageViewer from '@metacell/geppetto-meta-ui/big-image-viewer/BigImageViewer';
import apiClient from '../api/client';

const NeuroScan = () => {
  useEffect(() => {
    apiClient.get('/neurons')
      .then((response) => console.log(response));
  });

  return (
    <div>
      <h1>Neuro SCAN</h1>
      <BigImageViewer />
    </div>
  );
};

export default NeuroScan;

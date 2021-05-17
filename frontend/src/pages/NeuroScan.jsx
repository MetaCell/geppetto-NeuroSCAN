import React, { useEffect } from 'react';
import BigImageViewerExample
  from '@geppettoengine/geppetto-ui/dist/big-image-viewer/showcase/examples/BigImageViewerExample';
import apiClient from '../api/client';

const NeuroScan = () => {
  useEffect(() => {
    apiClient.get('/neurons')
      .then((response) => console.log(response));
  });

  return (
    <div>
      <h1>Neuro SCAN</h1>
      <BigImageViewerExample />
    </div>
  );
};

export default NeuroScan;

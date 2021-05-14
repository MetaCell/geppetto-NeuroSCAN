import React, { useEffect } from 'react';
import apiClient from '../api/client';

const NeuroScan = () => {
  useEffect(() => {
    apiClient.get('/neurons')
      .then((response) => console.log(response));
  });

  return (
    <div>
      <h1>Neuro SCAN</h1>
    </div>
  );
};

export default NeuroScan;

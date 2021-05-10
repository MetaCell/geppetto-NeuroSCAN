import React, { useEffect } from 'react';
import apiClient from '../api/client';

const NeuroScan = () => {
  useEffect(() => {
    apiClient.get('/neurons')
      .then((response) => console.log(response));
  });

  return (
    <h1>Neuro SCAN</h1>
  );
};

export default NeuroScan;

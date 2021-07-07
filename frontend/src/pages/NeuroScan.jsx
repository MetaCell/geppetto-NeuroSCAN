import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LeftSidebar from '../components/LeftSidebar';
import Header from '../components/Header';
import RightSidebar from '../components/RightSidebar';
import neuronService from '../services/NeuronService';

export default function NeuroScan() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await neuronService.getNeuronsCount();
      setCount(result);
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <Box display="flex">
        <LeftSidebar />
        <Box className="MuiBox-content">
          <Box className="MuiBox-empty">
            <Typography variant="h2">
              No Elements Added yet.
            </Typography>
            <Typography variant="h2">
              You can add one with the Search Component.
            </Typography>
            {count && (
            <Typography>
              {count}
            </Typography>
            )}
          </Box>
        </Box>
        <RightSidebar />
      </Box>
    </>
  );
}

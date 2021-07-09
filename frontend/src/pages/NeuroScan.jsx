import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LeftSidebar from '../components/LeftSidebar';
import Header from '../components/Header';
import RightSidebar from '../components/RightSidebar';
import VIEWS from '../constants';

export default function NeuroScan() {
  return (
    <>
      <Header view={VIEWS.neuroScan} />
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
          </Box>
        </Box>
        <RightSidebar />
      </Box>
    </>
  );
}

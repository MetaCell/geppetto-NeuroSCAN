import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LeftSidebar from '../components/LeftSidebar';
import Header from '../components/Header';
import RightSidebar from '../components/RightSidebar';

export default function NeuroScan() {
  return (
    <>
      <Header />
      <Box display="flex">
        <LeftSidebar />
        <Box className="MuiBox-content">
          <Box className="MuiBox-empty">
            <Typography variant="caption">
              No Elements Added yet.
            </Typography>
            <Typography variant="caption">
              You can add one with the Search Component.
            </Typography>
          </Box>
        </Box>
        <RightSidebar />
      </Box>
    </>
  );
}

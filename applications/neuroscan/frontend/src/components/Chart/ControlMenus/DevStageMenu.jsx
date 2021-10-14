import React from 'react';
import {
  Typography,
  Box,
} from '@material-ui/core';
import DevelopmentalStageFilter from '../../Common/DevelopmentalStageFilter';

const DevStageMenu = ({ timePoint, setTimePoint }) => (
  <Box className="development-stage">
    <Typography component="h3">Filter by Developmental Stage</Typography>
    <DevelopmentalStageFilter
      timePoint={timePoint}
      setTimePoint={setTimePoint}
    />
  </Box>
);

export default DevStageMenu;

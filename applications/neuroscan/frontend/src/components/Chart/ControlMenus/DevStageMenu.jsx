import React from 'react';
import {
  Typography,
  Box,
} from '@material-ui/core';
import DevelopmentalStageFilter from '../../Common/DevelopmentalStageFilter';

const DevStageMenu = ({ setDevelopmentalStage, developmentalStage }) => (
  <Box className="development-stage">
    <Typography component="h3">Filter by Developmental Stage</Typography>
    <DevelopmentalStageFilter
      setDevelopmentalStage={setDevelopmentalStage}
      developmentalStage={developmentalStage}
    />
  </Box>
);

export default DevStageMenu;

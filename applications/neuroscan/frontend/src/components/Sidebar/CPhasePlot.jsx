import React from 'react';
import { Typography, Box } from '@material-ui/core';
import PLUS from '../../images/plus.svg';

const CPhasePlot = () => (
  <Box className="wrap">
    <Typography component="h5">
      <img src={PLUS} alt="Plus" />
      Add a C-Phate Plot
    </Typography>
  </Box>
);

export default CPhasePlot;

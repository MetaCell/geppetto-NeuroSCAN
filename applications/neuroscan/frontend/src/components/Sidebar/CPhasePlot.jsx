import React from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Box } from '@material-ui/core';
import cphateService from '../../services/CphateService';
import { addInstances } from '../../redux/actions/widget';
import PLUS from '../../images/plus.svg';

const CPhasePlot = ({ timePoint }) => {
  const dispatch = useDispatch();

  const createCphateViewer = async () => {
    let cphate;
    try {
      cphate = await cphateService.getCphateByTimepoint(timePoint);
    } finally {
      if (cphate === undefined) {
        cphate = await cphateService.createTestCphate();
      }
    }
    const cphateInstances = cphateService.getInstances(cphate);
    dispatch(addInstances(null, cphateInstances));
  };

  return (
    <Box className="wrap" onClick={createCphateViewer}>
      <Typography component="h5">
        <img src={PLUS} alt="Plus" />
        Add CPHATE Plot
      </Typography>
    </Box>
  );
};

export default CPhasePlot;

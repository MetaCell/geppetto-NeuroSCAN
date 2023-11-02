import React from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Box } from '@material-ui/core';
import { addCphate } from '../../redux/actions/widget';
import PLUS from '../../images/plus.svg';

const CPhatePlot = ({ timePoint }) => {
  const dispatch = useDispatch();

  const createCphateViewer = async () => {
    dispatch(addCphate(timePoint));
  };

  return (
    <Box className="wrap" onClick={createCphateViewer} id="cphate-id">
      <Typography component="h5">
        <img src={PLUS} alt="Plus" />
        Add CPHATE Plot
      </Typography>
    </Box>
  );
};

export default CPhatePlot;

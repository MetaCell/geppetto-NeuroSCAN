import React from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Box } from '@material-ui/core';
import { addCphate } from '../../redux/actions/widget';
import PLUS from '../../images/plus.svg';

const CPhasePlot = ({ timePoint }) => {
  const dispatch = useDispatch();

  const createCphateViewer = async () => {
    dispatch(addCphate(timePoint));
  };

  return (
    <Box className="wrap" onClick={createCphateViewer}>
      <Typography component="h5">
        <img src={PLUS} alt="Plus" />
        Add a C-Phate Plot
      </Typography>
    </Box>
  );
};

export default CPhasePlot;

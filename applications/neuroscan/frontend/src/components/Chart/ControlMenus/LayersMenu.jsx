import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  Checkbox,
  Typography,
  Box,
  FormControlLabel,
} from '@material-ui/core';
import CHECKMARK from '../../../images/checkmark.svg';

const LayersMenu = () => {
  const [state, setState] = React.useState({
    checked0: true,
    checked1: true,
    checked2: true,
    checked3: true,
  });

  const handleCheck = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
    <Box className="layers">
      <Typography component="h3">Strata</Typography>
      <List>
        {[0, 1, 2, 3].map((value) => {
          const labelId = `checked${value}`;
          return (
            <ListItem key={value}>
              <FormControlLabel
                control={
                  <Checkbox checkedIcon={<img src={CHECKMARK} alt="checkmark" />} icon={<img src={CHECKMARK} alt="checkmark" />} checked={state.labelId} onChange={handleCheck} name={labelId} />
                }
                label="Secondary"
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default LayersMenu;

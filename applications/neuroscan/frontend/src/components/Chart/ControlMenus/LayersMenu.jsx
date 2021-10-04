import React, { useState } from 'react';
import {
  List,
  ListItem,
  Checkbox,
  Typography,
  Box,
  FormControlLabel,
} from '@material-ui/core';
import CHECKMARK from '../../../images/checkmark.svg';

const LayersMenu = ({ layers }) => {
  const [selectedLayers, setSelectedLayers] = useState({
    checked0: true,
    checked1: true,
    checked2: true,
  });

  const handleCheck = (event) => {
    setSelectedLayers({ ...selectedLayers, [event.target.name]: event.target.checked });
  };
  return (
    <Box className="layers">
      <Typography component="h3">Strata</Typography>
      <List>
        {layers.map((value) => {
          const labelId = `checked${value}`;
          return (
            <ListItem key={value}>
              <FormControlLabel
                control={(
                  <Checkbox
                    checkedIcon={<img src={CHECKMARK} alt="checkmark" />}
                    icon={<img src={CHECKMARK} alt="checkmark" />}
                    checked={selectedLayers.labelId}
                    onChange={handleCheck}
                    name={labelId}
                  />
                )}
                label={value}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default LayersMenu;

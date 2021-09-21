import React, { useState } from 'react';
import {
  List,
  ListItem,
  Typography,
  Box,
  Radio,
  ListItemText,
  Button,
} from '@material-ui/core';
import OBJ from '../../../images/obj.svg';
import SCREENSHOT from '../../../images/screenshot.svg';
import TICK from '../../../images/tick-circle.svg';

const DownloadMenu = () => {
  const [selectedValue, setSelectedValue] = useState('a');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Box className="download">
      <Box className="download-body">
        <List disableGutters disablePadding>
          <ListItem disablePadding disableGutters>
            <Radio
              checked={selectedValue === 'a'}
              onChange={handleChange}
              value="a"
              name="radio-buttons"
              inputProps={{ 'aria-label': 'A' }}
            />
            <ListItemText>
              {selectedValue === 'a' && <img className="tick" src={TICK} alt="tick" />}
              {selectedValue === 'a' ? <img src={OBJ} alt="OBJ" /> : <img src={OBJ} alt="OBJ" />}
              <Typography>OBJs files</Typography>
            </ListItemText>
          </ListItem>
          <ListItem disablePadding disableGutters>
            <Radio
              checked={selectedValue === 'b'}
              onChange={handleChange}
              value="b"
              name="radio-buttons"
              inputProps={{ 'aria-label': 'B' }}
            />
            <ListItemText>
              {selectedValue === 'b' && <img className="tick" src={TICK} alt="tick" />}
              {selectedValue === 'b' ? <img src={SCREENSHOT} alt="Screenshot" /> : <img src={SCREENSHOT} alt="Screenshot" />}
              <Typography>Screenshot</Typography>
            </ListItemText>
          </ListItem>
        </List>
      </Box>
      <Box className="download-footer">
        <Button disableElevation color="primary" variant="contained">
          Download
        </Button>
      </Box>
    </Box>
  );
};

export default DownloadMenu;

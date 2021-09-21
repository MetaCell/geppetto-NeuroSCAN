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

const DownloadMenu = ({ downloadFiles }) => {
  const controls = [
    {
      value: 'object',
      image: OBJ,
      unselectedImage: OBJ,
      displayText: 'OBJs files',
    },
    {
      value: 'screenshot',
      image: SCREENSHOT,
      unselectedImage: SCREENSHOT,
      displayText: 'Screenshot',
    },
  ];
  const [selectedValue, setSelectedValue] = useState(controls[0]?.value);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Box className="download">
      <Box className="download-body">
        <List>
          {
            controls.map((control, index) => (
              <ListItem key={`radio_list${index}`}>
                <Radio
                  checked={selectedValue === control?.value}
                  onChange={handleChange}
                  value={control?.value}
                  name="radio-buttons"
                  inputProps={{ 'aria-label': control?.value }}
                />
                <ListItemText>
                  {selectedValue === control?.value && <img className="tick" src={TICK} alt="tick" />}
                  {selectedValue === control?.value
                    ? <img src={control?.image} alt={control?.value} />
                    : <img src={control?.unselectedImage} alt={control?.value} />}
                  <Typography>{control?.displayText}</Typography>
                </ListItemText>
              </ListItem>
            ))
          }
        </List>
      </Box>
      <Box className="download-footer">
        <Button disableElevation color="primary" variant="contained" onClick={() => downloadFiles(selectedValue)}>
          Download
        </Button>
      </Box>
    </Box>
  );
};

export default DownloadMenu;

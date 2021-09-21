import React, { useState } from 'react';
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  Box,
} from '@material-ui/core';
import { ChromePicker } from 'react-color';
import MORPHOLOGY from '../../../images/morphology.svg';
import GROUP from '../../../images/group.svg';
import NEURON from '../../../images/neuron.svg';
import SYNAPSE from '../../../images/synapse.svg';
import CONTACT from '../../../images/contact.svg';

const ColorPickerMenu = ({
  groups,
  neurons,
  contacts,
  synapses,
}) => {
  const [opacityBg, setOpacityBg] = useState('1');
  const [background, setBackground] = useState({
    h: 250,
    s: 0,
    l: 0.2,
    a: opacityBg,
  });

  const handleChangeComplete = (data) => {
    if (data.hsl !== background) {
      setBackground(data.hsl);
      setOpacityBg(data.hsl.a);
    }
  };

  const [selection, setSelection] = useState('');

  const handleSelection = (option) => {
    setSelection(option);
  };

  const rowItem = (image, text) => (
    <ListItem
      key={text}
      button
      onClick={() => handleSelection(text)}
      selected={selection === text}
    >
      <ListItemText>
        <img src={image} alt={text} />
        {text}
      </ListItemText>
    </ListItem>
  );

  return (
    <Box className="color-picker">
      <Box className="color-picker--header">
        Select an instance to edit its color
      </Box>

      <Box className="color-picker--body">
        <Box className="list">
          <List>
            { rowItem(MORPHOLOGY, 'All instances') }
            <Divider />
            {
              groups.map((group) => (
                rowItem(GROUP, group)
              ))
            }
            <Divider />
            {
              neurons.map((neuron) => (
                rowItem(NEURON, neuron)
              ))
            }
            {
              contacts.map((contact) => (
                rowItem(CONTACT, contact)
              ))
            }
            {
              synapses.map((synapse) => (
                rowItem(SYNAPSE, synapse)
              ))
            }
          </List>
        </Box>
        <Box className="picker">
          <ChromePicker
            color={background}
            onChange={handleChangeComplete}
          />
        </Box>
      </Box>

    </Box>
  );
};

export default ColorPickerMenu;

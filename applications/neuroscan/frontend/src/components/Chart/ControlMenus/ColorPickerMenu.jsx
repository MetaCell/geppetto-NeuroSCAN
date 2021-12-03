import React, { useState } from 'react';
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  Box,
} from '@material-ui/core';
import { ChromePicker } from 'react-color';
import { setInstancesColor } from '../../../redux/actions/widget';
import MORPHOLOGY from '../../../images/morphology.svg';
import GROUP from '../../../images/group.svg';
import NEURON from '../../../images/neuron.svg';
import SYNAPSE from '../../../images/synapse.svg';
import CONTACT from '../../../images/contact.svg';
import CLUSTER from '../../../images/cluster.svg';

const ColorPickerMenu = ({
  dispatch,
  viewerId,
  groups,
  neurons,
  contacts,
  synapses,
  clusters,
}) => {
  const [background, setBackground] = useState({
    r: Math.random() * 255,
    g: Math.random() * 255,
    b: Math.random() * 255,
    a: 1,
  });

  const handleChangeComplete = (data) => {
    if (data.rgb !== background) {
      setBackground({
        r: data.rgb.r,
        g: data.rgb.g,
        b: data.rgb.b,
        a: data.rgb.a,
      });
    }
  };

  const handleSelection = (instance) => {
    let colorInstances;
    switch (instance.instanceType) {
      case 'ALL':
        colorInstances = neurons.concat(contacts, synapses);
        break;

      case 'GROUP':
        colorInstances = instance.instances;
        break;

      default:
        colorInstances = [instance];
    }
    dispatch(setInstancesColor(viewerId, colorInstances, {
      r: background.r / 255,
      g: background.g / 255,
      b: background.b / 255,
      a: background.a,
    }));
  };

  const rowItem = (image, instance) => (
    <ListItem
      key={`${instance.instanceType}-${instance.uid}`}
      button
      onClick={() => handleSelection(instance)}
      selected={instance.selected}
      autoFocus={instance.selected}
      classes={{
        selected: 'Mui-selected',
      }}
    >
      <ListItemText>
        <img src={image} alt={instance.name} />
        {instance.name}
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
            {
              rowItem(MORPHOLOGY, {
                uid: '-1',
                name: 'All instances',
                instanceType: 'ALL',
              })
            }
            { Object.keys(groups).length > 0 && <Divider /> }
            {
              Object.entries(groups)
                .map(([group, instances]) => (
                  rowItem(GROUP, {
                    uid: group,
                    name: group,
                    instanceType: 'GROUP',
                    instances,
                  })
                ))
            }
            { (neurons.length + contacts.length + synapses.length) > 0 && <Divider /> }
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
            {
              clusters.map((cluster) => (
                rowItem(CLUSTER, cluster)
              ))
            }
          </List>
        </Box>
        <Box className="picker">
          <ChromePicker
            color={background}
            onChangeComplete={handleChangeComplete}
          />
        </Box>
      </Box>

    </Box>
  );
};

export default ColorPickerMenu;

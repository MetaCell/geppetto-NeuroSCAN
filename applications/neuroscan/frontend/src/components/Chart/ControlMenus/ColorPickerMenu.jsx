import React, { useState, useRef, useEffect } from 'react';
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  Typography,
  Box,
} from '@material-ui/core';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import { ChromePicker } from 'react-color';
import { useSelector } from 'react-redux';
import { setInstancesColor } from '../../../redux/actions/widget';
import MORPHOLOGY from '../../../images/morphology.svg';
import GROUP from '../../../images/group.svg';
import NEURON from '../../../images/neuron.svg';
import SYNAPSE from '../../../images/synapse.svg';
import CONTACT from '../../../images/contact.svg';
import CLUSTER from '../../../images/cluster.svg';
// eslint-disable-next-line import/no-cycle
import { groupBy, sortIterations } from '../../../services/instanceHelpers';

const ColorPickerMenu = ({
  dispatch,
  viewerId,
  groups,
  neurons,
  contacts,
  synapses,
  clusters,
}) => {
  const widget = useSelector((state) => state.widgets[viewerId]);
  const widgetColorPickerColor = widget?.config?.colorPickerColor;
  const colorPickerColor = widgetColorPickerColor ? {
    r: widgetColorPickerColor.r * 255,
    g: widgetColorPickerColor.g * 255,
    b: widgetColorPickerColor.b * 255,
    a: widgetColorPickerColor.a,
  } : {
    r: Math.random() * 255,
    g: Math.random() * 255,
    b: Math.random() * 255,
    a: 1,
  };
  const [background, setBackground] = useState(colorPickerColor);

  const [expanded, setExpanded] = useState([
    `iteration-${clusters.find((i) => i.selected)?.i || {}}`,
  ]);

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
        colorInstances = neurons.concat(contacts, synapses, clusters);
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

  const focusRef = useRef(null);

  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, []);

  const clusterItem = (image, instance) => (
    <TreeItem
      nodeId={`cluster-${instance.uid}`}
      onClick={() => handleSelection(instance)}
      ref={instance.selected ? focusRef : undefined}
      label={(
        <div className="labelRoot">
          <Box className="labelIcon">
            <img src={CLUSTER} alt="" />
          </Box>
          <Typography variant="body2" className="labelText">
            {`${instance.name}`}
          </Typography>
        </div>
      )}
    />
  );

  const iterations = Object.values(groupBy(
    clusters,
    'i',
  ));

  const sortedArrayOfIterations = sortIterations(iterations);
  const handleToggle = (event, nodeIds) => {
    setExpanded([nodeIds[0]]);
  };

  const selected = clusters.find((i) => i.selected);

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
            { sortedArrayOfIterations.length > 0
              && (
              <TreeView
                className="scrollbar"
                defaultCollapseIcon={false}
                defaultExpandIcon={false}
                defaultEndIcon={false}
                onNodeToggle={handleToggle}
                selected={selected
                  ? [`iteration-${selected.i}`, `cluster-${selected.uid}`]
                  : []}
                expanded={expanded}
              >
                {
                  sortedArrayOfIterations.map((iteration) => (
                    <TreeItem
                      nodeId={`iteration-${iteration[0].i}`}
                      label={(
                        <div className="labelRoot">
                          <Box className="labelIcon">
                            <img src={CLUSTER} alt="" />
                          </Box>
                          <Typography variant="body2" className="labelText">
                            {`${iteration[0].i}`}
                          </Typography>
                        </div>
                      )}
                    >
                      {
                        iteration
                          .map((cluster) => (
                            clusterItem(CLUSTER, cluster)
                          ))
                      }
                    </TreeItem>
                  ))
                }
              </TreeView>
              )}
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

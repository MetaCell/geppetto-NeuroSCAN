import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Divider, IconButton } from '@material-ui/core';
import { addWidget } from '@metacell/geppetto-meta-client/common/layout/actions';
import { useDispatch } from 'react-redux';
import { WidgetStatus } from '@metacell/geppetto-meta-client/common/layout/model';
import Button from '@material-ui/core/Button';
import neuron from '@metacell/geppetto-meta-ui/3d-canvas/showcase/examples/SketchVolumeViewer_SAAVR_SAAVR_1_1_0000.obj';
import SimpleInstance from '@metacell/geppetto-meta-core/model/SimpleInstance';
import MagnifyingGlass from '../images/svg/magnifying-glass.svg';

const instanceTemplate = {
  eClass: 'SimpleInstance',
  id: 'ANeuron',
  name: 'The first SimpleInstance to be render with Geppetto Canvas',
  type: { eClass: 'SimpleType' },
  visualValue: {
    eClass: 'OBJ',
    obj: neuron,
  },
};
function loadInstances() {
  const instance = new SimpleInstance(instanceTemplate);
  window.Instances = [instance];
}

function getProxyInstances() {
  if (!window.Instances) {
    loadInstances();
  }
  return window.Instances.map((i) => (
    {
      instancePath: i.getId(),
      color:
            {
              r: Math.random(),
              g: Math.random(),
              b: Math.random(),
              a: 1,
            },
    }));
}

const CanvasWidget = {
  id: 'canvasExample',
  name: 'My Canvas Exmaple',
  component: 'canvas',
  panelName: 'centralPanel',
  enableClose: true,
  enableRename: true,
  enableDrag: true,
  status: WidgetStatus.ACTIVE,
  config: {
    data: getProxyInstances(),
  },
};

const LeftSidebar = () => {
  const dispatch = useDispatch();

  const onAddWidgetClick = (widget) => {
    dispatch(addWidget(widget));
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
    >
      <Box>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant="h5">Add element</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Button color="secondary" onClick={() => onAddWidgetClick(CanvasWidget)}>Add Example Neuron</Button>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Divider />
      <Box className="MuiBox-explore">
        <Typography variant="h5">Explorer</Typography>
        <IconButton><img src={MagnifyingGlass} alt="Search" /></IconButton>
      </Box>
      <Divider />
      <Box className="MuiBox-instance">
        <Typography variant="caption">No Instance Added yet</Typography>
      </Box>
    </Drawer>
  );
};

export default LeftSidebar;

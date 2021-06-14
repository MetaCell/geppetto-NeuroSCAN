import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Divider, IconButton } from '@material-ui/core';
import MagnifyingGlass from '../images/svg/magnifying-glass.svg';

const LeftSidebar = () => (
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
          <Typography>
            Lorem ipsum dolor sit amet.
          </Typography>
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

export default LeftSidebar;

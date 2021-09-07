import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import {
  Typography, Box, Link, Divider,
} from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import MagnifyingGlass from '../images/magnifying-glass.svg';

const RightSidebar = () => (
  <Drawer
    variant="permanent"
    anchor="right"
  >
    <Box>
      <Typography variant="h5">Details</Typography>
    </Box>
    <Divider />
    <Box>
      <img src={MagnifyingGlass} alt="Search" />
      <Typography>
        To see details of an Element,
        please add one in the list on the left or search in
        the Search component.
      </Typography>
    </Box>
    <Box>
      <HelpOutlineIcon />
      <Typography>
        If you need any help, you can
        <Link href="/"> read the documentation.</Link>
      </Typography>
    </Box>
  </Drawer>
);

export default RightSidebar;

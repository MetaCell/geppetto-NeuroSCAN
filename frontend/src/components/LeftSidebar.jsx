import React from 'react';
import {
  Accordion,
  makeStyles,
  Box,
  Drawer,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
  IconButton,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MagnifyingGlass from '../images/svg/magnifying-glass.svg';
import TestComponent from './TestComponent';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      '& .MuiDrawer-paper': {
        position: 'static',
      },
    },
    [theme.breakpoints.down('xs')]: {
      '&.shrink': {
        '& .MuiDrawer-paper': {
          width: 0,
        },
      },
      '& .MuiDrawer-paper': {
        paddingTop: '5.625rem',
        '&> p': {
          display: 'none',
        },
      },
    },
  },
}));

const LeftSidebar = (props) => {
  const classes = useStyles();
  const { shrink } = props;
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      className={shrink ? `${classes.root} shrink` : `${classes.root}`}
    >
      {!shrink ? (
        <>
          <Box>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography variant="h5">Add element</Typography>
              </AccordionSummary>
              <TestComponent />
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
        </>
      ) : (
        <Typography>NeuroSCAN</Typography>
      )}
    </Drawer>
  );
};

export default LeftSidebar;

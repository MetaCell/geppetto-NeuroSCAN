import React, { useState } from 'react';
import {
  makeStyles,
  Box,
  Drawer,
  Typography,
  IconButton,
} from '@material-ui/core';
import Explorer from './Sidebar/Explorer';
import Search from './Sidebar/Search';
import Results from './Sidebar/Results';
import CPhasePlot from './Sidebar/CPhasePlot';
import MagnifyingGlass from '../images/magnifying-glass.svg';

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
  fade: {
    opacity: 0.3,
    filter: 'grayscale(1)',
    pointerEvents: 'none',
  },
}));

const LeftSidebar = (props) => {
  const classes = useStyles();
  const { shrink } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [searching, setSearching] = useState(false);

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      className={shrink ? `${classes.root} shrink` : `${classes.root}`}
    >
      {!shrink ? (
        <>
          <Box className="wrap">
            <Typography component="h3">Add element</Typography>
            <Search
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
              setSearching={setSearching}
              searching={searching}
            />
          </Box>

          <Results searching={searching} />

          <CPhasePlot />

          <Box className="wrap">
            <Typography component="h3">
              Explorer
              <IconButton><img src={MagnifyingGlass} alt="Search" /></IconButton>
            </Typography>
          </Box>

          <Explorer />

          {/* <Box>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography variant="h5">Add element</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="caption">No Instance Added yet</Typography>
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
          </Box> */}
        </>
      ) : (
        <Typography>NeuroSCAN</Typography>
      )}
    </Drawer>
  );
};

export default LeftSidebar;

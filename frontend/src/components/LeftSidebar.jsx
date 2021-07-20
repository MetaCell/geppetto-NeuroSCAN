import React, { useState } from 'react';
import {
  makeStyles,
  Box,
  Drawer,
  Typography,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import Explorer from './Sidebar/Explorer';
import Search from './Sidebar/Search';
import Results from './Sidebar/Results';
import CPhasePlot from './Sidebar/CPhasePlot';
import MagnifyingGlass from '../images/magnifying-glass.svg';
import CHEVRON from '../images/chevron-right.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .add-element': {
      '& .MuiAccordion-root:last-child': {
        marginBottom: 0,
      },
      '& .MuiAccordionDetails-root': {
        padding: '0 1rem 0.5625rem',
      },
    },
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
          <Box className="wrap add-element">
            <Accordion>
              <AccordionSummary
                expandIcon={<img src={CHEVRON} width="4" height="6" alt="CHEVRON" />}
              >
                <Typography component="h3">Add element</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {/* <Typography variant="caption">No Instance Added yet</Typography> */}
                <Search
                  setSearchTerm={setSearchTerm}
                  searchTerm={searchTerm}
                  setSearching={setSearching}
                  searching={searching}
                />
              </AccordionDetails>
            </Accordion>
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
        </>
      ) : (
        <Typography>NeuroSCAN</Typography>
      )}
    </Drawer>
  );
};

export default LeftSidebar;

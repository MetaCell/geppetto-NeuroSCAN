import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  makeStyles,
  Box,
  Drawer,
  Typography,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from '@material-ui/core';
import Explorer from './Sidebar/Explorer/Explorer';
import Search from './Sidebar/Search';
import Results from './Sidebar/Results';
import CPhasePlot from './Sidebar/CPhasePlot';
import FILTER from '../images/filter.svg';
import ROTATE from '../images/rotate.svg';
import ROTATE_PAUSE from '../images/rotate-pause.svg';
import SynapsesFilter from './Sidebar/SynapsesFilter';
import { rotateStartAll, rotateStopAll } from '../redux/actions/widget';
import { cameraControlsRotateState } from './Chart/CameraControls';
import vars from '../styles/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .explorer': {
      '& .rotate': {
        '& > span > img': {
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'block',
        },
        '& > span > p': {
          minWidth: '50px',
          textAlign: 'left',
        },
      },
      paddingRight: '0.5rem',
    },
    '& .add-element': {
      border: `4px solid ${vars.primaryColor}`,
      '&_head': {
        paddingRight: '1rem',
        '& > .MuiButton-root': {
          padding: '0',
          minWidth: '1.5rem',
          backgroundColor: vars.filterButtonBg,
          border: 'none',
          height: '1.5rem',
        },
      },
      '& > .MuiAccordion-root > .MuiAccordionSummary-root': {
        '& > .MuiAccordionSummary-content': {
          order: 1,
        },
        '& > .MuiAccordionSummary-expandIcon': {
          order: 2,
          marginRight: 0,
        },
      },
      '& .wrap': {
        '& .MuiFormControl-root .MuiOutlinedInput-root': {
          height: 'auto',
          minHeight: '2.25rem',
        },
        '& .search-bar': {
          // marginBottom: '0.5625rem',
          '& .MuiInputBase-input': {
            minWidth: '3rem',
          },
          '& > .MuiIconButton-root': {
            padding: '0',
            position: 'absolute',
            right: '0.625rem',
            top: '0.75rem',
          },
          '& > img': {
            position: 'absolute',
            left: '0.625rem',
            top: '0.75rem',
          },
        },
        '& .MuiAccordion-root:last-child': {
          marginBottom: '0.5625rem',
        },
        '& .MuiAccordionDetails-root': {
          // padding: '0 1rem 0.5625rem',
        },
      },
    },
    [theme.breakpoints.up('sm')]: {
      '& .MuiDrawer-paper': {
        position: 'static',
      },
    },
    [theme.breakpoints.down('xs')]: {
      height: 'auto',
      '&.shrink': {
        '& .MuiDrawer-paper': {
          width: 0,
        },
      },
      '& .MuiDrawer-paper': {
        paddingTop: '2.5rem',
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
  const [searchTerms, setSearchTerms] = useState([]);
  const [timePoint, setTimePoint] = useState(0);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const widgets = useSelector((state) => state.widgets);
  const dispatch = useDispatch();

  const rotateState = Object.values(widgets).reduce(
    (r, w) => r || w.config.rotate === cameraControlsRotateState.ROTATING, false,
  ) || false;

  return (
    <>
      <Drawer
        variant="permanent"
        position="fixed"
        anchor="left"
        className={shrink ? `${classes.root} shrink` : `${classes.root}`}
      >
        {!shrink ? (
          <>
            <Box className="wrap add-element">
              <Accordion defaultExpanded>
                <Box display="flex" alignItems="center" className="add-element_head" justifyContent="space-between">
                  <AccordionSummary
                    expandIcon={null}
                  >
                    <Typography component="h3">
                      Add element Filter
                    </Typography>
                  </AccordionSummary>
                  <Button variant="outlined" onClick={() => setOpenFilterModal(true)}>
                    <img src={FILTER} alt="filter" />
                  </Button>
                </Box>
                <AccordionDetails>
                  {/* <Typography variant="caption">No Instance Added yet</Typography> */}

                  <Search
                    setSearchTerms={setSearchTerms}
                    searchTerms={searchTerms}
                    timePoint={timePoint}
                    setTimePoint={setTimePoint}
                  />

                  <Results />

                  <CPhasePlot timePoint={timePoint} />
                </AccordionDetails>
              </Accordion>
            </Box>

            <Box className="wrap explorer">
              <Typography component="h3">
                Navigation
                <IconButton
                  className="wrap explorer rotate"
                  onClick={() => {
                    if (rotateState) {
                      dispatch(rotateStopAll());
                    } else {
                      dispatch(rotateStartAll());
                    }
                  }}
                >
                  <img src={rotateState ? ROTATE_PAUSE : ROTATE} alt={rotateState ? 'Stop all' : 'Start all'} />
                  <Typography>{rotateState ? 'Pause all' : 'Play all'}</Typography>
                </IconButton>
              </Typography>
            </Box>

            <Explorer />
          </>
        ) : (
          <Typography>NeuroSCAN</Typography>
        )}
      </Drawer>

      <SynapsesFilter
        open={openFilterModal}
        handleClose={() => setOpenFilterModal(false)}
      />
    </>
  );
};

export default LeftSidebar;

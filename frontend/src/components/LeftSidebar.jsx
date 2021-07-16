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
  Slider,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MagnifyingGlass from '../images/svg/magnifying-glass.svg';

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
  const marks = [
    {
      value: 0,
      label: '0°C',
    },
    {
      value: 20,
      label: '20°C',
    },
    {
      value: 37,
      label: '37°C',
    },
    {
      value: 100,
      label: '100°C',
    },
  ];
  function valuetext(value) {
    return `${value}°C`;
  }

  function valueLabelFormat(value) {
    return marks.findIndex((mark) => mark.value === value) + 1;
  }
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
              <AccordionDetails>
                <Slider
                  defaultValue={20}
                  valueLabelFormat={valueLabelFormat}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider-restrict"
                  step={null}
                  valueLabelDisplay="auto"
                  marks={marks}
                  scale={(x) => -x}
                />
                {/* <Typography>
                  Lorem ipsum dolor sit amet.
                </Typography> */}
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
        </>
      ) : (
        <Typography>NeuroSCAN</Typography>
      )}
    </Drawer>
  );
};

export default LeftSidebar;

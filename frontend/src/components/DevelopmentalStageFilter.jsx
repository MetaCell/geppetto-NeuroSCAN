import React from 'react';
import {
  makeStyles,
  Box,
  Slider,
  Typography,
} from '@material-ui/core';
import DOWN from '../images/chevron-down.svg';
import vars from '../styles/constants';

const stages = ['L1', 'L2', 'L3', 'L4', 'Adult'];

const useStyles = makeStyles(() => ({
  root: {
    height: '3rem',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginBottom: '0.5625rem',
    '&.fade': {
      opacity: 0.3,
      filter: 'grayscale(1)',
      pointerEvents: 'none',
    },
  },
  sliderValue: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    '& p': {
      letterSpacing: '0.005em',
      fontSize: '.5rem',
      lineHeight: '.5rem',
      fontWeight: 'bold',
      color: vars?.captionTextColor,
      textAlign: 'center',
      flexShrink: 0,
      borderLeft: `1px solid ${vars.sliderBorderColor}`,
      width: `calc(100% / ${stages.length})`,
      '&:last-child': {
        borderRight: `1px solid ${vars.sliderBorderColor}`,
      },
    },
  },
}));

const sliderMarker = <img width="6" height="4" src={DOWN} alt="DOWN" />;

const DevelopmentalStageFilter = () => {
  const classes = useStyles();
  const marks = [
    {
      value: 0,
      label: sliderMarker,
    },
    {
      value: 10,
      label: sliderMarker,
    },
    {
      value: 40,
      label: sliderMarker,
    },
    {
      value: 42,
      label: sliderMarker,
    },
    {
      value: 60,
      label: sliderMarker,
    },
    {
      value: 66,
      label: sliderMarker,
    },
    {
      value: 100,
      label: sliderMarker,
    },
  ];

  return (
    <Box className={classes.root}>
      <Slider
        defaultValue={marks[1]?.value}
        aria-labelledby="developmental-stage-filter"
        step={null}
        valueLabelDisplay="off"
        marks={marks}
        aria-label="Developmental Stages Filter"
      />
      <Box className={classes.sliderValue}>
        {
          stages.map((stage) => <Typography key={stage}>{stage}</Typography>)
        }
      </Box>
    </Box>
  );
};

export default DevelopmentalStageFilter;

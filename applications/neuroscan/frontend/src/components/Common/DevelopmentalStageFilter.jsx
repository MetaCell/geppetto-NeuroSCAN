import React from 'react';
import {
  makeStyles,
  Box,
  Slider,
  Typography,
} from '@material-ui/core';
import DOWN from '../../images/chevron-down.svg';
import vars from '../../styles/constants';

const stages = ['L1', 'L2', 'L3', 'L4', 'Adult'];

const useStyles = makeStyles(() => ({
  root: {
    height: '3rem',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
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

const DevelopmentalStageFilter = ({ developmentalStage, setDevelopmentalStage }) => {
  const classes = useStyles();
  const marks = [
    {
      value: 0,
      label: sliderMarker,
    },
    {
      value: 75,
      label: sliderMarker,
    },
    {
      value: 250,
      label: sliderMarker,
    },
    {
      value: 260,
      label: sliderMarker,
    },
    {
      value: 400,
      label: sliderMarker,
    },
    {
      value: 450,
      label: sliderMarker,
    },
    {
      value: 600,
      label: sliderMarker,
    },
  ];

  const [sliderVal, setSliderVal] = React.useState(developmentalStage);

  const handleChange = (e, value) => {
    if (value !== sliderVal) {
      setSliderVal(value);
      setDevelopmentalStage(value);
    }
  };

  return (
    <Box className={classes.root}>
      <Slider
        defaultValue={developmentalStage}
        aria-labelledby="developmental-stage-filter"
        step={null}
        valueLabelDisplay="auto"
        marks={marks}
        aria-label="Developmental Stages Filter"
        onChange={handleChange}
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
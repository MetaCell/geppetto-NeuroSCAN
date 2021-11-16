import React from 'react';
import { useSelector } from 'react-redux';
import {
  makeStyles,
  Box,
  Slider,
  Typography,
} from '@material-ui/core';
import DOWN from '../../images/chevron-down.svg';
import vars from '../../styles/constants';
import BeanEmbryo from '../../images/BeanEmbryo.svg';
import CommaEmbryo from '../../images/CommaEmbryo.svg';
import TwoCellEmbryo from '../../images/2cellEmbryo.svg';
import TwoFoldEmbryo from '../../images/2FoldEmbryo.svg';
import ThreeFoldEmbryo from '../../images/3foldEmbryo.svg';
import OneFiveEmbryo from '../../images/1.5FoldEmbryo.svg';
import HatchingEmbryo from '../../images/Hatching.svg';

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
  stageIcons: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    '& span': {
      marginBottom: '0.8125rem',
      '& img': {
        width: 'auto',
      },
      width: '2.25rem',
      height: '2.25rem',
      background: vars.whiteTextColor,
      boxShadow: '0 0 0.9375rem rgba(0, 0, 0, 0.4)',
      borderRadius: '2.25rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '0.0625rem solid transparent',
    },
  },
  sliderValue: {
    display: 'flex',
    alignItems: 'center',
    '& p': {
      letterSpacing: '0.005em',
      fontSize: '.5rem',
      lineHeight: '.5rem',
      fontWeight: 'bold',
      color: vars?.captionTextColor,
      textAlign: 'center',
      flexShrink: 0,
      paddingLeft: '0.125rem',
      borderLeft: `0.0625rem solid ${vars.sliderBorderColor}`,
      '&:last-child': {
        borderRight: `0.0625rem solid ${vars.sliderBorderColor}`,
      },
    },
  },
}));

const devStageImages = {
  '2cell': TwoCellEmbryo,
  bean: BeanEmbryo,
  comma: CommaEmbryo,
  '1-5-fold': OneFiveEmbryo,
  twitching: BeanEmbryo,
  '2-fold': TwoFoldEmbryo,
  '3-fold': ThreeFoldEmbryo,
  hatching: HatchingEmbryo,
};

const DevelopmentalStageFilter = (props) => {
  const { timePoint, setTimePoint } = props;
  const classes = useStyles();
  const devStages = useSelector((state) => state.devStages.promoterDB);
  const min = Math.min(...devStages.map((devStage) => devStage.begin));
  // eslint-disable-next-line max-len
  const max = Math.max(...devStages.map((devStage) => Math.max(devStage.end, devStage.begin)));
  const stepWidth = (max - min) / 90;
  const [sliderVal, setSliderVal] = React.useState(timePoint);

  const handleChange = (e, value) => {
    if (value !== sliderVal) {
      setSliderVal(value);
      setTimePoint(value);
    }
  };

  const sliderMarker = (icon) => (
    <Box className={classes.stageIcons}>
      <Typography component="span">
        <img src={icon} alt="icon" />
      </Typography>
      <img width="6" height="4" src={DOWN} alt="DOWN" />
    </Box>
  );

  const marks = devStages
    .reduce((x, devStage) => (x.concat(devStage.timepoints?.split(','))), [])
    .filter((item) => item !== undefined)
    .map((mark, index) => ({
      value: parseInt(mark, 10),
      label: sliderMarker(devStageImages[devStages[index]?.uid]),
    }));

  return devStages.length > 0 && (
    <Box className={classes.root}>
      <Slider
        defaultValue={sliderVal}
        aria-labelledby="developmental-stage-filter"
        step={null}
        valueLabelDisplay="auto"
        marks={marks}
        min={min}
        max={max}
        aria-label="Developmental Stages Filter"
        onChange={handleChange}
      />
      <Box className={classes.sliderValue}>
        {
          devStages.map((stage) => {
            console.log(stage);
            const stageWidth = (Math.max(stage.end, stage.begin) - stage.begin) / stepWidth;
            return (
              <Typography
                key={stage.id}
                style={{ width: `${stageWidth}%` }}
              >
                {stage.name}
              </Typography>
            );
          })
        }
      </Box>
    </Box>
  );
};

export default DevelopmentalStageFilter;

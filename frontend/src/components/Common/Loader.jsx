import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import vars from '../../styles/constants';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    lineHeight: 1,
  },
  bottom: {
    color: vars.modalBorderColor,
  },
  top: {
    color: vars.primaryColor,
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
  circle: {
    strokeLinecap: 'round',
  },
}));

const CircularLoader = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={16}
        thickness={4}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={16}
        thickness={4}
      />
    </div>
  );
};

export default CircularLoader;

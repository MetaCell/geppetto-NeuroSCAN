import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import LeftSidebar from '../components/LeftSidebar';
import Header from '../components/Header';
import VIEWS from '../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      '& .primary-structure': {
        paddingTop: '5.625rem',
      },
    },
  },
}));

export default function NeuroScan() {
  const classes = useStyles();

  const [toggle, setToggle] = React.useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <Box className={classes.root}>
      <Header toggle={toggle} toggleSidebar={handleToggle} view={VIEWS.neuroScan} />
      <Box className="primary-structure" display="flex">
        <LeftSidebar toggle={toggle} />
        <Box className="primary-structure_content">
          <Box className="MuiBox-empty" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Typography variant="h2">
              No Elements Added yet.
            </Typography>
            <Typography variant="h2">
              You can add one with the Search Component.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

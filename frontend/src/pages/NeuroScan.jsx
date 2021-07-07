import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useStore } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getLayoutManagerInstance } from '@metacell/geppetto-meta-client/common/layout/LayoutManager';
import Box from '@material-ui/core/Box';
import Header from '../components/Header';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';

const useStyles = makeStyles({
  layoutContainer: {
    position: 'relative',
    width: '100%',
    height: '90vh',
  },
});

export default function NeuroScan() {
  const classes = useStyles();
  const store = useStore();
  const [LayoutManager, setLayoutManager] = useState(undefined);

  useEffect(() => {
    // Workaround because getLayoutManagerInstance
    // is undefined when calling it in global scope
    // Need to wait until store is ready ...
    // TODO: find better way to retrieve the LayoutManager component!
    if (LayoutManager === undefined) {
      const myManager = getLayoutManagerInstance();
      if (myManager) {
        setLayoutManager(myManager.getComponent());
      }
    }
  }, [store]);

  return (
    <>
      <Header />
      <Box display="flex">
        <LeftSidebar />
        <Box className="MuiBox-content">
          <div className={classes.layoutContainer}>
            {LayoutManager === undefined ? <CircularProgress /> : <LayoutManager />}
          </div>
        </Box>
        <RightSidebar />
      </Box>

    </>
  );
}

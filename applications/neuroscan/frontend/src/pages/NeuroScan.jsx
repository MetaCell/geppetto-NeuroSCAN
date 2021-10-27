import React, { useEffect, useState } from 'react';
import { useSelector, useStore } from 'react-redux';
import { Box, CircularProgress, makeStyles } from '@material-ui/core';
import { getLayoutManagerInstance } from '@metacell/geppetto-meta-client/common/layout/LayoutManager';
import LeftSidebar from '../components/LeftSidebar';
import Header from '../components/Header';
import { VIEWS } from '../utilities/constants';
import ViewerPlaceholder from '../components/ViewerPlaceholder';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      '& .primary-structure': {
        paddingTop: '2.5rem',
        display: 'block !important',
      },
    },
  },
  layoutContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  left: {
    flexShrink: 0,
  },
  right: {
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      height: '100%',
    },
  },
}));

export default function NeuroScan() {
  const classes = useStyles();
  const store = useStore();
  const [LayoutComponent, setLayoutManager] = useState(undefined);
  const [shrinkSidebar, setShrinkSidebar] = React.useState(false);
  const viewerCount = useSelector((state) => Object.keys(state.widgets).length);

  const handleToggle = () => {
    setShrinkSidebar(!shrinkSidebar);
  };

  useEffect(() => {
    // Workaround because getLayoutManagerInstance
    // is undefined when calling it in global scope
    // Need to wait until store is ready ...
    // TODO: find better way to retrieve the LayoutManager component!
    if (LayoutComponent === undefined) {
      const myManager = getLayoutManagerInstance();
      if (myManager) {
        setLayoutManager(myManager.getComponent());
      }
    }
  }, [store]);

  let componentToRender = <CircularProgress />;
  if (LayoutComponent !== undefined) {
    if (viewerCount === 0) {
      componentToRender = <ViewerPlaceholder />;
    } else {
      componentToRender = <LayoutComponent />;
    }
  }

  return (
    <Box className={classes.root}>
      <Box className="primary-structure" display="flex">
        <Box className={classes.left}>
          <Header shrink={shrinkSidebar} toggleSidebar={handleToggle} view={VIEWS?.neuroScan} />
          <LeftSidebar shrink={shrinkSidebar} />
        </Box>
        <Box className={classes.right}>
          <Box className={`primary-structure_content ${classes.layoutContainer} ${viewerCount > 0 ? 'padding' : ''}`}>
            {/* {!viewerCount > 0 ? <SubHeader view={VIEWS?.neuroScan} /> : ''} */}
            {componentToRender}
          </Box>
        </Box>
      </Box>

      {/* <Header shrink={shrinkSidebar} toggleSidebar={handleToggle} view={VIEWS?.neuroScan} />
      <Box className="primary-structure" display="flex">
        <LeftSidebar shrink={shrinkSidebar} />
        <Box className={`primary-structure_content ${classes.layoutContainer}`}>
          {componentToRender}
        </Box>
      </Box> */}
    </Box>
  );
}

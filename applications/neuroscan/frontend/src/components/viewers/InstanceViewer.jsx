/* eslint-disable import/no-cycle */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Canvas from '@metacell/geppetto-meta-ui/3d-canvas/Canvas';
import * as layoutActions from '@metacell/geppetto-meta-client/common/layout/actions';
import { makeStyles } from '@material-ui/core/styles';
import './cameraControls.css';
import {
  setSelectedInstances,
  invertColorSelectedInstances,
  setOriginalColorSelectedInstances,
} from '../../services/instanceHelpers';

const useStyles = makeStyles({
  canvasContainer: {
    width: '100%',
    height: '100%',
  },
});

function InstanceViewer(props) {
  const { viewerId, cameraOptions } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const widget = useSelector((state) => state.widgets[viewerId]);
  const camOptionsRef = useRef(null);

  if (widget.config.flash) {
    let counter = 1;
    const interval = setInterval(() => {
      widget.config.instances = invertColorSelectedInstances(widget.config.instances);
      if (counter === 6) {
        clearInterval(interval);
        widget.config.instances = setOriginalColorSelectedInstances(widget.config.instances);
      }
      dispatch(layoutActions.updateWidget(widget));
      counter += 1;
    }, 1500);
    widget.config.flash = false;
    dispatch(layoutActions.updateWidget(widget));
  }

  const canvasData = widget.config.instances.map((instance) => ({
    instancePath: instance.uid,
    color: instance.color,
  }));

  const cameraHandler = (data) => {
    if (data.position.x !== 0) {
      camOptionsRef.current = data;
    }
  };

  const onSelection = (selectedInstances) => {
    setSelectedInstances(dispatch, widget, selectedInstances);
  };

  const onMount = (scene) => {
    // eslint-disable-next-line no-console
    console.log(scene);
  };

  let camOptions = {
    ...cameraOptions,
  };
  if (camOptionsRef.current) {
    // if we have a position then add it to the camOptions
    camOptions = {
      ...camOptions,
      position: camOptionsRef.current.position,
    };
  }

  return (
    <div className={classes.canvasContainer}>
      <Canvas
        key={viewerId}
        data={canvasData}
        cameraOptions={camOptions}
        cameraHandler={cameraHandler}
        backgroundColor={0x2C2C2C}
        onSelection={onSelection}
        onMount={onMount}
      />
    </div>
  );
}

export default InstanceViewer;

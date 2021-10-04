import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Canvas from '@metacell/geppetto-meta-ui/3d-canvas/Canvas';
import * as layoutActions from '@metacell/geppetto-meta-client/common/layout/actions';
import { makeStyles } from '@material-ui/core/styles';
import './cameraControls.css';
import { colorFlash } from '../../utilities/defaults';
import { setInstanceSelected } from '../../services/instanceHelpers';

const useStyles = makeStyles({
  canvasContainer: {
    width: '100%',
    height: '100%',
  },
});

function InstanceViewer(props) {
  const { viewerId, instances, cameraOptions } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const widget = useSelector((state) => state.widgets[viewerId]);
  const camOptionsRef = useRef(null);
  const [canvasData, setCanvasData] = useState([]);

  const setCanvasDataFromInstances = (color = null) => {
    setCanvasData(
      instances.map((instance) => ({
        instancePath: instance.uid,
        color: instance.selected ? color || instance.color : instance.color,
      })),
    );
  };

  const doFlash = () => {
    let counter = 1;
    const interval = setInterval(() => {
      setCanvasDataFromInstances(counter % 2 === 0 ? colorFlash : null);
      if (counter === 5) {
        clearInterval(interval);
      }
      counter += 1;
    }, 1500);
  };

  useEffect(() => {
    const hasSelected = instances.find((instance) => instance.selected);
    if (hasSelected) {
      setCanvasDataFromInstances(colorFlash);
      doFlash();
    } else {
      setCanvasDataFromInstances();
    }
  }, [instances]);

  const cameraHandler = (data) => {
    if (data.position.x !== 0) {
      camOptionsRef.current = data;
    }
  };

  const onSelection = (selectedInstances) => {
    widget.config.instances = setInstanceSelected(
      widget.config.instances, selectedInstances,
    );
    dispatch(layoutActions.updateWidget(widget));
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

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Canvas from '@metacell/geppetto-meta-ui/3d-canvas/Canvas';
import { makeStyles } from '@material-ui/core/styles';
import './cameraControls.css';
import { updateSelectedInstances } from '../../redux/actions/viewers';

const useStyles = makeStyles({
  canvasContainer: {
    width: '100%',
    height: '100%',
  },
});

const colorFlash = '#FF0000';
const colorDefault = '#00FF00';

function InstanceViewer(props) {
  const { viewerId } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const viewer = useSelector((state) => state.viewers[viewerId]);
  const camOptionsRef = useRef(null);
  const [canvasData, setCanvasData] = useState([]);

  const setCanvasDataFromInstances = (selectedColor = colorDefault) => {
    setCanvasData(
      viewer.instances.map((instance) => ({
        instancePath: instance.uid,
        color: instance.selected === true ? selectedColor : colorDefault, // instance.color,
      })),
    );
  };

  const doFlash = () => {
    let counter = 1;
    const interval = setInterval(() => {
      setCanvasDataFromInstances(counter % 2 === 0 ? colorFlash : colorDefault);
      if (counter === 5) {
        clearInterval(interval);
      }
      counter += 1;
    }, 1500);
  };

  useEffect(() => {
    const hasSelected = viewer.instances.find((instance) => instance.selected);
    if (hasSelected) {
      setCanvasDataFromInstances(colorFlash);
      doFlash();
    } else {
      setCanvasDataFromInstances();
    }
  }, [viewer.instances]);

  const cameraHandler = (data) => {
    if (data.position.x !== 0) {
      camOptionsRef.current = data;
    }
  };

  const onSelection = (selectedInstances) => {
    dispatch(updateSelectedInstances(viewerId, selectedInstances));
  };

  const onMount = (scene) => {
    // eslint-disable-next-line no-console
    console.log(scene);
  };

  let camOptions = {
    ...viewer.cameraOptions,
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

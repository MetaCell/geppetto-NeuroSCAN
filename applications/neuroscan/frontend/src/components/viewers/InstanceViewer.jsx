import React, { useRef } from 'react';
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

function InstanceViewer(props) {
  const { viewerId } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const viewer = useSelector((state) => state.viewers[viewerId]);
  const camOptionsRef = useRef(null);

  const canvasData = viewer.instances.map((instance) => ({
    instancePath: instance.uid,
    color: instance.selected === true ? '#FF0000' : '#00ff00', // instance.color,
  }));

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

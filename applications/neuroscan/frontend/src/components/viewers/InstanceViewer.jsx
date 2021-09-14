import React, { useEffect, useState, useRef } from 'react';
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
  const [canvasData, setCanvasData] = useState([]);

  const viewer = useSelector((state) => state.viewers[viewerId]);
  const camOptionsRef = useRef(viewer.cameraOptions);

  useEffect(() => {
    setCanvasData(viewer.instances.map((instance) => ({
      instancePath: instance.uid,
      color: instance.selected === true ? '#FF0000' : instance.color,
    })));
  }, [viewer.instances]);

  const cameraHandler = (data) => {
    if (data.position.x !== 0 && data.position.y !== 0 && data.position.z !== 0) {
      camOptionsRef.current = {
        ...viewer.cameraOptions,
        position: data.position,
        rotation: data.rotation,
        eyeLength: data.eyeLength,
      };
    }
  };

  const onSelection = (selectedInstances) => {
    dispatch(updateSelectedInstances(viewerId, selectedInstances));
  };

  const onMount = (scene) => {
    // eslint-disable-next-line no-console
    console.log(scene);
  };

  return (
    <div className={classes.canvasContainer}>
      <Canvas
        key={viewerId}
        data={canvasData}
        cameraOptions={camOptionsRef.current}
        cameraHandler={cameraHandler}
        backgroundColor={0x2C2C2C}
        onSelection={onSelection}
        onMount={onMount}
      />
    </div>
  );
}

export default InstanceViewer;

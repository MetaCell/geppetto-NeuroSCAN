import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Canvas from '@metacell/geppetto-meta-ui/3d-canvas/Canvas';
import { makeStyles } from '@material-ui/core/styles';
import './cameraControls.css';

const useStyles = makeStyles({
  canvasContainer: {
    width: '100%',
    height: '100%',
  },
});

function InstanceViewer(props) {
  const { viewerId } = props;
  const classes = useStyles();
  const [canvasData, setCanvasData] = useState([]);

  const viewer = useSelector((state) => state.viewers[viewerId]);

  useEffect(() => {
    setCanvasData(viewer.instances.map((instance) => (instance.color ? {
      instancePath: instance.uid,
      color: instance.color,
    } : {
      instancePath: instance.uid,
    })));
  }, [viewer.instances]);

  const cameraHandler = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  const onSelection = (selectedInstances) => {
    // eslint-disable-next-line no-console
    console.log(selectedInstances);
  };

  const onMount = (scene) => {
    // eslint-disable-next-line no-console
    console.log(scene);
  };

  return (
    <div className={classes.canvasContainer}>
      <Canvas
        key={viewer.id}
        data={canvasData}
        cameraOptions={viewer.cameraOptions}
        cameraHandler={cameraHandler}
        backgroundColor={0x2C2C2C}
        onSelection={onSelection}
        onMount={onMount}
      />
    </div>
  );
}

export default InstanceViewer;

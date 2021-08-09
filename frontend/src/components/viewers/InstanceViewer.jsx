import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Canvas from '@metacell/geppetto-meta-ui/3d-canvas/Canvas';

function InstanceViewer(props) {
  const { viewerId } = props;
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
    <Canvas
      data={canvasData}
      cameraOptions={viewer.cameraOptions}
      cameraHandler={cameraHandler}
      backgroundColor={0x2C2C2C}
      onSelection={onSelection}
      onMount={onMount}
    />
  );
}

export default InstanceViewer;

import React from 'react';
import { useSelector } from 'react-redux';
import Canvas from '@metacell/geppetto-meta-ui/3d-canvas/Canvas';

function MorphologyViewer(props) {
  const { viewerId } = props;
  const viewer = useSelector((state) => state.viewers[viewerId]);
  const canvasData = viewer.instances.map((instance) => ({
    instancePath: instance,
  }));
  const cameraHandler = (data) => {
    console.log(data);
  };
  const onSelection = (selectedInstances) => {
    console.log(selectedInstances);
  };
  const onMount = (scene) => {
    console.log(scene);
  };
  return (
    <Canvas
      data={canvasData}
      cameraOptions={viewer.cameraOptions}
      cameraHandler={cameraHandler}
      backgroundColor={0x505050}
      onSelection={onSelection}
      onMount={onMount}
    />
  );
}

export default MorphologyViewer;

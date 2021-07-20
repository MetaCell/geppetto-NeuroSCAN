import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Canvas from '@metacell/geppetto-meta-ui/3d-canvas/Canvas';
import { createSimpleInstance, updateGeppettoInstances } from '../../utilities/functions';

function MorphologyViewer(props) {
  const { viewerId } = props;
  const [canvasData, setCanvasData] = useState([]);
  const [scene, setScene] = useState(null);

  const viewer = useSelector((state) => state.viewers[viewerId]);

  useEffect(async () => {
    const simpleInstances = await Promise.all(
      viewer.instances.map(async (instance) => createSimpleInstance(instance)),
    );
    updateGeppettoInstances(simpleInstances);
    setCanvasData(viewer.instances.map((instance) => ({
      instancePath: instance.uid,
    })));
  }, [viewer.instances]);

  const cameraHandler = (data) => {
    console.log(data);
  };
  const onSelection = (selectedInstances) => {
    console.log(selectedInstances);
  };
  const onMount = (threeScene) => {
    console.log(threeScene);
    setScene(threeScene);
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

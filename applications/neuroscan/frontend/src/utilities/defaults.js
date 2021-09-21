import CameraControls from '../components/Chart/CameraControls';

export const defaultCameraOptions = {
  angle: 50,
  near: 0.01,
  far: 1000,
  baseZoom: 1,
  cameraControls: {
    instance: CameraControls,
    props: { wireframeButtonEnabled: false },
  },
  reset: false,
  autorotate: false,
  wireframe: false,
};

// colors
export const colorFlash = '#FF0000';
export const colorDefault = '#00FFFF';

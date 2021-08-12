import React from 'react';
import {
  IconButton,
  Typography,
  Box,
  Radio,
} from '@material-ui/core';
import { AccessAlarm } from '@material-ui/icons';
// import {
//   faChevronLeft,
//   faChevronUp,
//   faChevronRight,
//   faChevronDown,
//   faHome,
//   faUndo,
//   faRedo,
//   faVideo,
//   faSearchPlus,
//   faSearchMinus,
// } from '@fortawesome/free-solid-svg-icons';

// import './CameraControls.less';

import ZOOMIN from '../../images/graph/zoom-in.svg';
import ZOOMOUT from '../../images/graph/zoom-out.svg';
import HOME from '../../images/graph/home.svg';
import FULLSCREEN from '../../images/graph/full-screen.svg';
import DEVELOPMENT from '../../images/graph/developmental-stage.svg';
import LAYERS from '../../images/graph/layers.svg';
import DOWNLOAD from '../../images/graph/download.svg';
import PICKER from '../../images/graph/color-picker.svg';
import DARK from '../../images/graph/dark.svg';
import LIGHT from '../../images/graph/light.svg';

export const cameraControlsActions = {
  PAN_LEFT: 'panLeft',
  PAN_UP: 'panUp',
  PAN_RIGHT: 'panRight',
  PAN_DOWN: 'panDown',
  PAN_HOME: 'cameraHome',
  ROTATE_LEFT: 'rotateLeft',
  ROTATE_UP: 'rotateUp',
  ROTATE_RIGHT: 'rotateRight',
  ROTATE_DOWN: 'rotateDown',
  ROTATE_Z: 'rotateZ',
  ROTATE_MZ: 'rotateMZ',
  ROTATE: 'rotate',
  ZOOM_IN: 'zoomIn',
  ZOOM_OUT: 'zoomOut',
  WIREFRAME: 'wireframe',
};

// const styles = theme => ({ button: { color: theme.palette.button.main } });

const CameraControls = (props) => {
  const {
    classes,
    cameraControlsHandler,
    wireframeButtonEnabled,
  } = props;
  const butt = [
    {
      action: cameraControlsActions.PAN_LEFT,
      className: 'pan-left',
      tooltip: 'Pan left',
      icon: AccessAlarm,
    },
    {
      action: cameraControlsActions.PAN_RIGHT,
      className: 'pan-right',
      tooltip: 'Pan right',
      icon: AccessAlarm,
    },
    {
      action: cameraControlsActions.PAN_UP,
      className: 'pan-top',
      tooltip: 'Pan up',
      icon: AccessAlarm,
    },
    {
      action: cameraControlsActions.PAN_DOWN,
      className: 'pan-bottom',
      tooltip: 'Pan down',
      icon: AccessAlarm,
    },
    {
      action: cameraControlsActions.PAN_HOME,
      className: 'pan-home',
      tooltip: 'Pan home',
      icon: AccessAlarm,
    },
    {
      action: cameraControlsActions.ROTATE_LEFT,
      className: 'rotate-left',
      tooltip: 'Rotate left',
      icon: AccessAlarm,
    },
    {
      action: cameraControlsActions.ROTATE_RIGHT,
      className: 'rotate-right',
      tooltip: 'Rotate right',
      icon: AccessAlarm,
    },
    {
      action: cameraControlsActions.ROTATE_UP,
      className: 'rotate-top rotate90',
      tooltip: 'Rotate up',
      icon: AccessAlarm,
    },
    {
      action: cameraControlsActions.ROTATE_DOWN,
      className: 'rotate-bottom rotate90',
      tooltip: 'Rotate down',
      icon: AccessAlarm,
    },
    {
      action: cameraControlsActions.ROTATE,
      className: 'auto-rotate',
      tooltip: 'Auto-Rotate',
      icon: AccessAlarm,
    },
    {
      action: cameraControlsActions.ROTATE_MZ,
      className: 'rotate-mz',
      tooltip: 'Rotate mz',
      icon: AccessAlarm,
    },
    {
      action: cameraControlsActions.ROTATE_Z,
      className: 'rotate-z',
      tooltip: 'Rotate z',
      icon: AccessAlarm,
    },
    {
      action: cameraControlsActions.ZOOM_IN,
      className: 'zoom-in',
      tooltip: 'Zoom in',
      icon: AccessAlarm,
    },
    {
      action: cameraControlsActions.ZOOM_OUT,
      className: 'zoom-out',
      tooltip: 'Zoom out',
      icon: AccessAlarm,
    },
  ];

  if (wireframeButtonEnabled) {
    butt.push({
      action: cameraControlsActions.WIREFRAME,
      className: 'gpt-sphere_wireframe-jpg wireframe',
      tooltip: 'Toggle wireframe',
      icon: null,
    });
  }
  return (
    <div className="position-toolbar">
      {/* {butt.map((value, index) => (
      <IconButton
        key={index}
        disabled={false}
        onClick={() => cameraControlsHandler(value.action)}
      />
    ))} */}

      <div className="left">
        <Box className="mode-selector">
          <Typography component="label">
            {/* <input type="radio" name="mode" checked /> */}
            <Radio name="mode" />
            <Typography component="span">
              <img src={DARK} alt="" />
            </Typography>
          </Typography>

          <Typography component="label">
            {/* <input type="radio" name="mode" /> */}
            <Radio name="mode" />
            <Typography component="span">
              <img src={LIGHT} alt="" />
            </Typography>
          </Typography>
        </Box>

        <IconButton disableRipple>
          <img src={PICKER} alt="" />
        </IconButton>

        <IconButton disableRipple>
          <img src={ZOOMIN} alt="" />
        </IconButton>

        <IconButton disableRipple>
          <img src={DEVELOPMENT} alt="" />
        </IconButton>

        <IconButton disableRipple>
          <img src={LAYERS} alt="" />
        </IconButton>

        <IconButton disableRipple>
          <img src={DOWNLOAD} alt="" />
        </IconButton>
      </div>

      <div className="right">
        <IconButton disableRipple>
          <img src={ZOOMIN} alt="" />
        </IconButton>

        <IconButton disableRipple>
          <img src={ZOOMOUT} alt="" />
        </IconButton>

        <IconButton disableRipple>
          <img src={HOME} alt="" />
        </IconButton>

        <IconButton disableRipple>
          <img src={FULLSCREEN} alt="" />
        </IconButton>
      </div>
    </div>
  );
};

// CameraControls.defaultProps = { wireframeButtonEnabled: false, };

// CameraControls.propTypes = {
//   /**
//    * Function to callback on camera controls changes
//    */
//   cameraControlsHandler: PropTypes.func.isRequired,

//   /**
//    * Boolean to enable/disable wireframe
//    */
//   wireframeButtonEnabled: PropTypes.bool,
// };

export default CameraControls;

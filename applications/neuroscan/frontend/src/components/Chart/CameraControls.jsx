import React from 'react';
import {
  IconButton,
  Typography,
  Box,
  Radio,
  Tooltip,
} from '@material-ui/core';

import ZOOM_IN from '../../images/graph/zoom-in.svg';
import ZOOM_OUT from '../../images/graph/zoom-out.svg';
import HOME from '../../images/graph/home.svg';
import DEVELOPMENT from '../../images/graph/developmental-stage.svg';
import LAYERS from '../../images/graph/layers.svg';
import DOWNLOAD from '../../images/graph/download.svg';
import PICKER from '../../images/graph/color-picker.png';
import DARK from '../../images/graph/dark.svg';
import LIGHT from '../../images/graph/light.svg';
import MenuControl from './MenuControl';

export const cameraControlsActions = {
  ZOOM_IN: 'zoomIn',
  ZOOM_OUT: 'zoomOut',
  COLOR_PICKER: 'COLOR_PICKER',
  DEV_STAGES: 'DEVELOPMENT_STAGES',
  LAYERS: 'LAYERS',
  DOWNLOAD: 'DOWNLOAD',
  HOME: 'cameraHome',
};

const CameraControls = (props) => {
  const {
    cameraControlsHandler,
  } = props;

  const controlsLeft = [
    {
      action: cameraControlsActions.PICKER,
      tooltip: 'Color Picker',
      image: PICKER,
    },
    {
      action: cameraControlsActions.DEVELOPMENT,
      tooltip: 'Development Stages',
      image: DEVELOPMENT,
    },
    {
      action: cameraControlsActions.LAYERS,
      tooltip: 'Layers',
      image: LAYERS,
    },
    {
      action: cameraControlsActions.DOWNLOAD,
      tooltip: 'Download',
      image: DOWNLOAD,
    },
  ];

  const controlsRight = [
    {
      action: cameraControlsActions.ZOOM_IN,
      tooltip: 'Zoom In',
      image: ZOOM_IN,
    },
    {
      action: cameraControlsActions.ZOOM_OUT,
      tooltip: 'Zoom Out',
      image: ZOOM_OUT,
    },
    {
      action: cameraControlsActions.HOME,
      tooltip: 'Home',
      image: HOME,
    },
  ];

  const backgrounds = { DARK: 'dark', LIGHT: 'light' };

  const [canvasBg, setCanvasBg] = React.useState(backgrounds.DARK);

  const RadioOption = ({
    value, image,
  }) => (
    <Typography component="label">
      <Radio name="mode" value={value} onChange={(e) => setCanvasBg(e.target.value)} checked={canvasBg === value} />
      <Typography>
        <img src={image} alt={value} />
      </Typography>
    </Typography>
  );

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // const setDevelopmentStage = () => {
  //   handleClick();
  // };

  // const controlAction = (value) => {
  //   switch (value?.tooltip) {
  //     case 'Development Stages': setDevelopmentStage();
  //       break;
  //     case 'Layers': setDevelopmentStage();
  //       break;
  //     case 'Download': setDevelopmentStage();
  //       break;
  //     default:
  //       cameraControlsHandler(value?.action);
  //   }
  // };

  const Control = ({ value }) => (
    <Tooltip title={value.tooltip} placement="top">
      <IconButton
        disableRipple
        key={value?.tooltip}
        onClick={handleClick}
      >
        <img
          src={value.image}
          alt={value?.tooltip}
        />
      </IconButton>
    </Tooltip>
  );

  return (
    <>
      <div className="position-toolbar">
        <div className="left">
          <Box className="mode-selector">
            <RadioOption value={backgrounds.DARK} image={DARK} />
            <RadioOption value={backgrounds.LIGHT} image={LIGHT} />
          </Box>

          {
            controlsLeft.map((value) => (
              <Control value={value} />
            ))
          }
        </div>

        <div className="right">
          {
            controlsRight.map((value) => (
              <Control value={value} />
            ))
          }
        </div>
      </div>
      <MenuControl handleClose={handleClose} anchorEl={anchorEl} />
    </>
  );
};

export default CameraControls;

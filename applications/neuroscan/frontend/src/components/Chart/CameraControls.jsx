/* eslint-disable import/no-cycle */
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  IconButton,
  Typography,
  Box,
  Radio,
  Tooltip,
} from '@material-ui/core';
import { updateBackgroundColorViewer } from '../../redux/actions/widget';
import ZOOM_IN from '../../images/graph/zoom-in.svg';
import ZOOM_OUT from '../../images/graph/zoom-out.svg';
import HOME from '../../images/graph/home.svg';
import DEVELOPMENT from '../../images/graph/developmental-stage.svg';
import LAYERS from '../../images/graph/layers.svg';
import PICKER from '../../images/graph/color-picker.png';
import DARK from '../../images/graph/dark.svg';
import LIGHT from '../../images/graph/light.svg';
import MenuControl from './MenuControl';
import {
  VIEWER_MENU,
  CANVAS_BACKGROUND_COLOR_LIGHT,
  CANVAS_BACKGROUND_COLOR_DARK,
} from '../../utilities/constants';

export const cameraControlsActions = {
  ZOOM_IN: 'zoomIn',
  ZOOM_OUT: 'zoomOut',
  COLOR_PICKER: 'COLOR_PICKER',
  DEV_STAGES: 'DEVELOPMENT_STAGES',
  LAYERS: 'LAYERS',
  HOME: 'cameraHome',
};

const CameraControls = (props) => {
  const {
    cameraControlsHandler,
    viewerId,
  } = props;
  const dispatch = useDispatch();
  const pickerRef = useRef();
  const developmentRef = useRef();
  const layersRef = useRef();

  const controlsLeft = [
    {
      action: cameraControlsActions.PICKER,
      tooltip: 'Color Picker',
      image: PICKER,
      ref: pickerRef,
      constant: VIEWER_MENU.colorPicker,
    },
    {
      action: cameraControlsActions.DEVELOPMENT,
      tooltip: 'Development Stages',
      image: DEVELOPMENT,
      ref: developmentRef,
      constant: VIEWER_MENU.devStage,
    },
    {
      action: cameraControlsActions.LAYERS,
      tooltip: 'Layers',
      image: LAYERS,
      ref: layersRef,
      constant: VIEWER_MENU.layers,
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

  const [canvasBg, setCanvasBg] = useState(backgrounds.DARK);

  const handleSetCanvasBackground = (value) => {
    setCanvasBg(value);
    let backgroundColor = 0;
    switch (value) {
      case backgrounds.LIGHT:
        backgroundColor = CANVAS_BACKGROUND_COLOR_LIGHT;
        break;
      default:
        backgroundColor = CANVAS_BACKGROUND_COLOR_DARK;
    }
    dispatch(updateBackgroundColorViewer(viewerId, backgroundColor));
  };

  const RadioOption = ({
    value, image,
  }) => (
    <Typography component="label">
      <Radio name="mode" value={value} onChange={(e) => handleSetCanvasBackground(e.target.value)} checked={canvasBg === value} />
      <Typography>
        <img src={image} alt={value} />
      </Typography>
    </Typography>
  );

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'menu-control-popover' : undefined;
  const [selection, setSelection] = useState(null);

  const handleClick = (event, ref, constant) => {
    setSelection(constant);
    setAnchorEl(ref.current);
  };

  const Control = ({ value }) => (
    <Tooltip title={value.tooltip} placement="top">
      <IconButton
        disableRipple
        key={value?.tooltip}
        onClick={() => cameraControlsHandler(value?.action)}
      >
        <img
          src={value.image}
          alt={value?.tooltip}
        />
      </IconButton>
    </Tooltip>
  );

  return (
    <div className="position-toolbar">
      <div className="left">
        <Box className="mode-selector">
          <RadioOption value={backgrounds.DARK} image={DARK} />
          <RadioOption value={backgrounds.LIGHT} image={LIGHT} />
        </Box>
        {
          controlsLeft.map((value, index) => (
            <Tooltip title={value.tooltip} placement="top" key={`left_'${index}`}>
              <IconButton
                disableRipple
                key={value?.tooltip}
                aria-describedby={id}
                ref={value?.ref}
                onClick={(event) => handleClick(event, value?.ref, value?.constant)}
              >
                <img
                  src={value.image}
                  alt={value?.tooltip}
                />
              </IconButton>
            </Tooltip>
          ))
        }
        <MenuControl
          id={id}
          open={open}
          handleClose={handleClose}
          anchorEl={anchorEl}
          selection={selection}
          viewerId={viewerId}
        />
      </div>

      <div className="right">
        {
          controlsRight.map((value, index) => (
            <Control key={index} value={value} />
          ))
        }
      </div>
    </div>
  );
};

export default CameraControls;

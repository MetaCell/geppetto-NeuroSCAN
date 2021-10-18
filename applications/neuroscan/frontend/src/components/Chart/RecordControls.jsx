/* eslint-disable import/no-cycle */
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  IconButton,
  Typography,
  Box,
  Tooltip,
  Button,
} from '@material-ui/core';
import RECORDING from '../../images/graph/recording.svg';
import RECORDING_ACTIVE from '../../images/graph/recording-active.svg';
import STOP from '../../images/graph/stop.svg';
import RecordControlModal from './RecordControlModal';

export const cameraControlsActions = {
  ZOOM_IN: 'zoomIn',
  ZOOM_OUT: 'zoomOut',
  COLOR_PICKER: 'COLOR_PICKER',
  DEV_STAGES: 'DEVELOPMENT_STAGES',
  LAYERS: 'LAYERS',
  DOWNLOAD: 'DOWNLOAD',
  HOME: 'cameraHome',
};

const RecordControls = (props) => {
  const {
    cameraControlsHandler,
  } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [recording, setRecording] = useState(false);
  const stopRecording = () => {
    setRecording(false);
    setModalOpen(true);
  };
  return (
    <>
      <Box className="position-toolbar recording">
        { !recording && (
          <Tooltip title="Recording" placement="top">
            <IconButton
              disableRipple
              key="abc"
              onClick={() => setRecording(true)}
            >
              <img
                src={RECORDING}
                alt="Recording"
              />
            </IconButton>
          </Tooltip>
        )}

        { recording && (
          <Box className="wrap">
            <img
              src={RECORDING_ACTIVE}
              alt="Recording"
            />
            <Typography>Recording...</Typography>
            <Typography>00:01:23</Typography>
            <Button onClick={stopRecording}>
              <img
                src={STOP}
                alt="Recording"
              />
              Stop
            </Button>
          </Box>
        )}
      </Box>

      <RecordControlModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default RecordControls;

/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Typography,
  Box,
  Tooltip,
  Button,
} from '@material-ui/core';
import { captureControlsActions } from '@metacell/geppetto-meta-ui/capture-controls/CaptureControls';
import RECORDING from '../../images/graph/recording.svg';
import RECORDING_ACTIVE from '../../images/graph/recording-active.svg';
import STOP from '../../images/graph/stop.svg';
import RecordControlModal from './RecordControlModal';

const RecordControls = (props) => {
  const {
    captureControlsHandler,
  } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [recording, setRecording] = useState(false);
  const [timerInterval, setTimerInterval] = useState(null);
  const [timer, setTimer] = useState({ timer: 0, recordingTime: '00:00:00' });
  const stopRecording = () => {
    captureControlsHandler(captureControlsActions.STOP);
    setRecording(false);
    setModalOpen(true);
  };
  const startRecording = () => {
    captureControlsHandler(captureControlsActions.START);
    setRecording(true);
  };

  const convertToTime = (sec) => {
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours < 10) { hours = `0${hours}`; }
    if (minutes < 10) { minutes = `0${minutes}`; }
    if (seconds < 10) { seconds = `0${seconds}`; }
    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (recording) {
      setTimerInterval(setInterval(() => {
        setTimer((time) => ({
          timer: time.timer + 1,
          recordingTime: convertToTime(time.timer + 1),
        }));
      }, 1000));
    }
    if (!recording) {
      setTimerInterval(clearInterval(timerInterval));
      setTimer({ timer: 0, recordingTime: '00:00:00' });
    }
  }, [recording]);

  return (
    <>
      <Box className="position-toolbar recording">
        <Tooltip title="Recording" placement="top">
          <IconButton
            disableRipple
            key="recorder"
            onClick={startRecording}
            disabled={recording}
          >
            <img
              src={RECORDING}
              alt="Recording"
            />
          </IconButton>
        </Tooltip>

        { recording && (
          <Box className="wrap">
            <img
              src={RECORDING_ACTIVE}
              alt="Recording"
              className="icon-blink"
            />
            <Typography>Recording...</Typography>
            <Typography>{timer?.recordingTime}</Typography>
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
        captureControlsHandler={captureControlsHandler}
      />
    </>
  );
};

export default RecordControls;

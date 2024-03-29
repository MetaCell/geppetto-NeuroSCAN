/* eslint-disable import/no-cycle */
import React, { useState, useEffect, useRef } from 'react';
import {
  IconButton,
  Typography,
  Box,
  Tooltip,
  Button, Popover,
} from '@material-ui/core';
import {
  captureControlsActionsStart,
  captureControlsActionsStop,
  captureControlsActionsDownloadScreenshot,
} from '@metacell/geppetto-meta-ui/capture-controls/CaptureControls';
import DOWNLOAD from '../../../images/graph/download.svg';
import HIGHLIGHT from '../../../images/graph/highlight.svg';
import RECORDING from '../../../images/graph/recording.svg';
import RECORDING_ACTIVE from '../../../images/graph/recording-active.svg';
import STOP from '../../../images/graph/stop.svg';
import RecordControlModal from './RecordControlModal';
import DownloadMenu from './DownloadMenu';
import { DOWNLOAD_OBJS, DOWNLOAD_SCREENSHOT } from '../../../utilities/constants';
import store from '../../../redux/store';
import zipService from '../../../services/ZipService';
import HighlightPopover from './highlight/HighlightPopover';

const CaptureControls = (props) => {
  const {
    captureControlsHandler,
    widgetName,
    viewerId,
    hasHighlight,
  } = props;
  const [recordingModalOpen, setRecordingModalOpen] = useState(false);
  const [downloadPopoverOpen, setDownloadPopoverOpen] = useState(false);
  const [highlightPopoverOpen, setHighlightPopoverOpen] = useState(false);
  const [recording, setRecording] = useState(false);
  const [timerInterval, setTimerInterval] = useState(null);
  const [timer, setTimer] = useState({ timer: 0, recordingTime: '00:00:00' });
  const downloadRef = useRef();
  const highlightRef = useRef();
  const videoBlob = useRef(null);
  const stopRecording = () => {
    videoBlob.current = captureControlsHandler(captureControlsActionsStop());
    setRecording(false);
    setRecordingModalOpen(true);
  };
  const startRecording = () => {
    videoBlob.current = null;
    captureControlsHandler(captureControlsActionsStart());
    setRecording(true);
  };
  const handleCloseModal = () => {
    videoBlob.current = null;
    setRecordingModalOpen(false);
  };
  const handleDownloadOpen = () => {
    setDownloadPopoverOpen(true);
  };
  const handleDownloadClose = () => {
    setDownloadPopoverOpen(false);
  };
  const handleDownloadScreenshot = () => {
    captureControlsHandler(captureControlsActionsDownloadScreenshot(`${widgetName}.png`));
  };

  const handleHighlightOpen = () => {
    setHighlightPopoverOpen(true);
  };

  const handleHighlightClose = () => {
    setHighlightPopoverOpen(false);
  };

  const handleDownloadObjs = () => {
    const state = store.getState();
    const { instances } = state.widgets[viewerId].config;
    const files = instances.map((i) => {
      const { visualValue } = window.Instances.find((wi) => wi.wrappedObj.id === i.uid).wrappedObj;
      const base64Content = visualValue.eClass === window.GEPPETTO.Resources.GLTF
        ? visualValue.gltf : visualValue.obj;
      const content = atob(base64Content.slice('data:model/obj;base64,'.length));
      return {
        name: `${i.name}.${visualValue.eClass}`,
        content,
      };
    });
    zipService.createZipFile('instances.zip', files);
  };
  const handleDownload = (action) => {
    switch (action) {
      case DOWNLOAD_SCREENSHOT:
        handleDownloadScreenshot();
        break;
      case DOWNLOAD_OBJS:
        handleDownloadObjs(viewerId);
        break;
      default:
    }
  };

  const convertToTime = (sec) => {
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
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
        <Box display="flex" alignItems="center" className="icons">
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
          <Tooltip title="Download" placement="top">
            <IconButton
              ref={downloadRef}
              disableRipple
              key="downloader"
              onClick={handleDownloadOpen}
            >
              <img
                src={DOWNLOAD}
                alt="Downloading"
              />
            </IconButton>
          </Tooltip>
          {hasHighlight && (
            <Tooltip title="Highlight" placement="top">
              <IconButton
                disableRipple
                ref={highlightRef}
                key="highlighter"
                onClick={handleHighlightOpen}
              >
                <img
                  src={HIGHLIGHT}
                  alt="Highlight neurons"
                />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        {recording && (
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

      <Popover
        className="custom-popover"
        open={downloadPopoverOpen}
        anchorEl={downloadRef.current}
        onClose={handleDownloadClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <DownloadMenu downloadFiles={handleDownload} />
      </Popover>

      {hasHighlight
          && (
          <HighlightPopover
            open={highlightPopoverOpen}
            anchorEl={highlightRef.current}
            onClose={handleHighlightClose}
            viewerId={viewerId}
          />
          )}

      <RecordControlModal
        open={recordingModalOpen}
        handleClose={handleCloseModal}
        captureControlsHandler={captureControlsHandler}
        videoBlob={videoBlob.current}
        widgetName={widgetName}
      />
    </>
  );
};

export default CaptureControls;

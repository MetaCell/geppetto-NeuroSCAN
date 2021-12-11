import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import {
  Box,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core';
import { formatDate } from '@metacell/geppetto-meta-ui/3d-canvas/captureManager/utils';
import CLOSE from '../../../images/close.svg';
import DOWNLOAD from '../../../images/download.svg';
import DELETE from '../../../images/delete.svg';
import DELETE_WHITE from '../../../images/delete-white.svg';

export const downloadBlob = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
};

const webmToMp4 = require('webm-to-mp4');
const toBuffer = require('blob-to-buffer');

const RecordControlModal = (props) => {
  const {
    open, handleClose, videoBlob, widgetName,
  } = props;
  const [deleteOption, setDeleteOption] = useState(false);
  const downloadRecording = () => {
    toBuffer(videoBlob, (err, buffer) => {
      if (err) throw err;
      const mp4 = webmToMp4(buffer);
      downloadBlob(mp4, `${widgetName}_${formatDate(new Date())}.mp4`);
      handleClose();
    });
  };
  const videoSrc = videoBlob ? window.URL.createObjectURL(videoBlob) : null;

  return (
    <Modal
      open={open}
      className="primary-modal"
      onClose={handleClose}
    >
      <Box className="modal-dialog medium">
        <Box className="modal-header">
          <Typography>New screen recording</Typography>
          <IconButton
            color="inherit"
            onClick={handleClose}
            disableFocusRipple
            disableRipple
          >
            <img src={CLOSE} alt="Close" />
          </IconButton>
        </Box>
        <Box className="modal-body">
          <Box className="video-box">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video src={videoSrc} playsInline controls="controls" className="video-preview" />
          </Box>
        </Box>
        <Box className="modal-footer" justifyContent="space-between">
          { !deleteOption && (
            <Button variant="outlined" onClick={() => setDeleteOption(true)}>
              <img src={DELETE} alt="Delete" />
              Delete
            </Button>
          ) }
          { deleteOption && (
            <Button disableElevation color="secondary" variant="contained" onClick={handleClose}>
              <img src={DELETE_WHITE} alt="Delete" />
              Sure, delete.
            </Button>
          ) }
          <Button disableElevation color="primary" variant="contained" onClick={downloadRecording}>
            <img src={DOWNLOAD} alt="Close" />
            Download
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RecordControlModal;

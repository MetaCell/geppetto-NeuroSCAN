import React from 'react';
import Modal from '@material-ui/core/Modal';
import {
  Box,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core';
import CLOSE from '../../images/close.svg';
import DOWNLOAD from '../../images/download.svg';
import DELETE from '../../images/delete.svg';
import VIDEO from '../../images/video.jpg';
import PLAY from '../../images/graph/play.svg';

const RecordControlModal = (props) => {
  const { open, handleClose } = props;
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
            <img src={VIDEO} alt="Video" />
            <img src={PLAY} className="play-icon" alt="Play" />
          </Box>
        </Box>
        <Box className="modal-footer" justifyContent="space-between">
          <Button variant="outlined">
            <img src={DELETE} alt="Close" />
            Delete
          </Button>
          <Button disableElevation color="primary" variant="contained">
            <img src={DOWNLOAD} alt="Close" />
            Download
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RecordControlModal;

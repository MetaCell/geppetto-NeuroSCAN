import React from 'react';
import Modal from '@material-ui/core/Modal';
import {
  Box,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core';
import CLOSE from '../images/close.svg';
import { ABOUT_CONTENT } from '../constants';

const AboutModal = (props) => {
  const { open, handleClose, title } = props;
  return (
    <Modal
      open={open}
      className="primary-modal"
      onClose={handleClose}
    >
      <Box className="modal-dialog">
        <Box className="modal-header">
          <Typography>{`About ${title}`}</Typography>
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
          <Typography>
            {`${title} ${ABOUT_CONTENT}`}
          </Typography>
          <Typography>
            MetaCell is world-leader in software for neuroscience.
          </Typography>
        </Box>
        <Box className="modal-footer">
          {/* <Button variant="outlined" onClick={handleClose}>
            Legal Notice
          </Button>
          <Button disableElevation color="primary" variant="contained" onClick={handleClose}>
            Share
          </Button> */}
        </Box>
      </Box>
    </Modal>
  );
};

export default AboutModal;

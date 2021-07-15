import React from 'react';
import Modal from '@material-ui/core/Modal';
import { Box, Typography, Button } from '@material-ui/core';
import CLOSE from '../images/svg/close.svg';

const AboutModal = (props) => {
  const { open, handleClose } = props;
  return (
    <Modal
      open={open}
      className="primary-modal"
      onClose={handleClose}
    >
      <Box className="modal-dialog">
        <Box className="modal-header">
          <Typography>About PromoterDB</Typography>
          <Button onClick={handleClose}><img src={CLOSE} alt="Close" /></Button>
        </Box>
        <Box className="modal-body">
          <Typography>
            PromoterDB is an initiative from the Yale University for Neurosciences, in partnership
            with MetaCell.
          </Typography>
          <Typography>
            MetaCell is world-leader in software for neuroscience.
          </Typography>
        </Box>
        <Box className="modal-footer">
          <Button variant="outlined" onClick={handleClose}>
            Legal Notice
          </Button>
          <Button disableElevation color="primary" variant="contained" onClick={handleClose}>
            Share
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AboutModal;
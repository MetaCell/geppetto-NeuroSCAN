import React from 'react';
import Modal from '@material-ui/core/Modal';
import {
  Box,
  Typography,
  IconButton, Button,
} from '@material-ui/core';
import CLOSE from '../images/close.svg';

const WarningModal = (props: any) => {
  const { open, handleClose, instances } = props;

  return (
    <Modal
      open={open}
      className="primary-modal"
      onClose={handleClose}
    >
      <Box className="modal-dialog">
        <Box className="modal-header">
          <Typography>Neurons not present</Typography>
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
            Caution: you are moving in a timepoint where the following neurons are not present.
            Be aware that if you decide to proceed, these data will be lost.
          </Typography>
          <ul>
            {instances?.map((instance: any) => <li key={instance.name}>{instance.name}</li>)}
          </ul>
        </Box>
        <Box className="modal-footer">
          <Button disableElevation color="primary" variant="contained" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default WarningModal;

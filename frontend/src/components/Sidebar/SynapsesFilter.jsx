import React from 'react';
import Modal from '@material-ui/core/Modal';
import {
  Box,
  Typography,
  IconButton,
  Button,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import CLOSE from '../../images/close.svg';

const SynapsesFilter = (props) => {
  const {
    open, handleClose, filter, setFilter,
  } = props;

  const handleChange = (event) => {
    setFilter({ ...filter, [event.target.name]: event.target.checked });
  };

  const applyFilters = () => {
    handleClose();
  };

  return (
    <Modal
      open={open}
      className="primary-modal"
      onClose={handleClose}
    >
      <Box className="modal-dialog small">
        <Box className="modal-header">
          <Typography>Filter results</Typography>
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
          <FormControl component="fieldset">
            <FormLabel component="legend">Synapses</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={filter?.chemical} color="primary" onChange={handleChange} name="chemical" />}
                label="Chemical"
              />
              <FormControlLabel
                control={<Checkbox checked={filter?.electrical} color="primary" onChange={handleChange} name="electrical" />}
                label="Electrical"
              />
            </FormGroup>
          </FormControl>
        </Box>
        <Box className="modal-footer" justifyContent="space-between">
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button disableElevation color="primary" variant="contained" onClick={applyFilters}>
            Apply filters
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SynapsesFilter;

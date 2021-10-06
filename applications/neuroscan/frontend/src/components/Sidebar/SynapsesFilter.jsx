import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CLOSE from '../../images/close.svg';
// import SELECTICON from '../../images/select-icon.png';
import * as search from '../../redux/actions/search';

const SynapsesFilter = (props) => {
  const {
    open, handleClose,
  } = props;
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.search.filters);
  const [synapsesFilter, setSynapsesFilter] = useState(filters.synapsesFilter);
  const [position, setPosition] = React.useState(0);

  const handleSelect = (event) => {
    setPosition(event.target.value);
  };

  useEffect(() => {
  }, [filters]);

  const handleChange = (event) => {
    setSynapsesFilter({
      ...synapsesFilter,
      [event.target.name]: event.target.checked,
    });
  };

  const applyFilters = () => {
    dispatch(
      search.updateFilters(
        { synapsesFilter },
      ),
    );
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
                control={<Checkbox checked={synapsesFilter?.chemical} color="primary" onChange={handleChange} name="chemical" />}
                label="Chemical"
              />
              <FormControlLabel
                control={<Checkbox checked={synapsesFilter?.electrical} color="primary" onChange={handleChange} name="electrical" />}
                label="Electrical"
              />
            </FormGroup>
          </FormControl>

          <Box className="neurons-position">
            <Typography component="h3">Neurons position</Typography>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography component="p">Pre</Typography>

              <FormControl variant="outlined">
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={position}
                  onChange={handleSelect}
                  IconComponent={ExpandMoreIcon}
                >
                  <MenuItem value={0}>
                    Select one
                  </MenuItem>
                  <MenuItem value={10}>AMAR</MenuItem>
                  <MenuItem value={20}>AIDR</MenuItem>
                  <MenuItem value={30}>APAT</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography component="p">Post</Typography>
              <FormControl variant="outlined">
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={position}
                  onChange={handleSelect}
                  IconComponent={ExpandMoreIcon}
                >
                  <MenuItem value={0}>
                    Select one
                  </MenuItem>
                  <MenuItem value={10}>AMAR</MenuItem>
                  <MenuItem value={20}>AIDR</MenuItem>
                  <MenuItem value={30}>APAT</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
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

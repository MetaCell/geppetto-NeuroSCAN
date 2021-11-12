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
  Icon,
} from '@material-ui/core';
import CLOSE from '../../images/close.svg';
import SELECTICON from '../../images/select-icon.svg';
import * as search from '../../redux/actions/search';

const SynapsesFilter = (props) => {
  const {
    open, handleClose,
  } = props;
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.search.filters);
  const [synapsesFilter, setSynapsesFilter] = useState(filters.synapsesFilter);
  const [pre, setPre] = useState(0);
  const [post, setPost] = useState(0);
  const searchTerms = useSelector((state) => state.search.filters.searchTerms);
  const [preSearchOptions, setPreSearchOptions] = useState(searchTerms);
  const [postSearchOptions, setPostSearchOptions] = useState(searchTerms);

  useEffect(() => {
    setPreSearchOptions(searchTerms);
    setPostSearchOptions(searchTerms);
  }, [searchTerms]);

  const handleChange = (event) => {
    setSynapsesFilter({
      ...synapsesFilter,
      [event.target.name]: event.target.checked,
    });
  };

  const applyFilters = () => {
    dispatch(
      search.updateFilters({
        synapsesFilter: {
          ...synapsesFilter,
          preNeuron: pre,
          postNeuron: post,
        },
      }),
    );
    handleClose();
  };

  useEffect(() => {
    setPostSearchOptions(searchTerms.filter((value) => value !== pre));
  }, [pre]);

  useEffect(() => {
    setPreSearchOptions(searchTerms.filter((value) => value !== post));
  }, [post]);

  const selectFilter = (filter, value, fn, searchOptions) => (
    <Box display="flex" alignItems="center" justifyContent="space-between" key={filter}>
      <Typography component="p">{filter}</Typography>

      <FormControl variant="outlined">
        <Select
          value={value}
          onChange={(e) => fn(e.target.value)}
          IconComponent={(prop) => (
            <Icon {...prop} className={`material-icons ${prop.className}`}>
              <img src={SELECTICON} alt="select" />
            </Icon>
          )}
        >
          <MenuItem value={0}>
            Select one
          </MenuItem>
          {
            searchOptions.map((item) => <MenuItem value={item} key={`pre${item}`}>{item}</MenuItem>)
          }
        </Select>
      </FormControl>
    </Box>
  );

  return (
    <Modal
      open={open}
      className="primary-modal"
      onClose={handleClose}
    >
      <Box className="modal-dialog small">
        <Box className="modal-header">
          <Typography>Filters</Typography>
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
            <FormLabel component="legend">Synapse Types</FormLabel>
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
            <Typography component="h3">Synapses pre and post connections</Typography>
            {
              selectFilter('Pre', pre, setPre, preSearchOptions)
            }
            {
              selectFilter('Post', post, setPost, postSearchOptions)
            }
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

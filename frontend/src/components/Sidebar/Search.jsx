import React from 'react';
import {
  TextField, Box, Typography, InputAdornment, IconButton,
} from '@material-ui/core';
import MagnifyingGlass from '../../images/magnifying-glass.svg';
import CircularLoader from '../Common/Loader';
import DevelopmentalStageFilter from '../Common/DevelopmentalStageFilter';
import CLOSE from '../../images/icon-close.svg';

const Search = (props) => {
  const {
    searchTerm, setSearchTerm, searching, setSearching,
  } = props;
  const search = (value) => {
    setSearchTerm(value);
    if (searchTerm.length >= 3) {
      setSearching(true);
      setTimeout(() => setSearching(false), 1000);
    }
  };

  return (
    <Box className="wrap">
      <TextField
        fullWidth
        placeholder="Filter by Name"
        variant="outlined"
        InputProps={{
          startAdornment: <InputAdornment position="start"><img src={MagnifyingGlass} alt="MagnifyingGlass" /></InputAdornment>,
          endAdornment: <InputAdornment position="end"><IconButton onClick={() => search('')}><img src={CLOSE} alt="CLOSE" /></IconButton></InputAdornment>,
        }}
        onChange={(e) => search(e.target.value)}
        value={searchTerm}
      />

      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="caption">Filter by Developmental Stage</Typography>
        { searching ? <CircularLoader /> : null }
      </Box>
      <DevelopmentalStageFilter />
    </Box>
  );
};

export default Search;

import React from 'react';
import {
  Box, Typography, IconButton, Chip,
} from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import MagnifyingGlass from '../../images/magnifying-glass.svg';
import DevelopmentalStageFilter from '../Common/DevelopmentalStageFilter';
import CLOSE from '../../images/icon-close.svg';
import REMOVE from '../../images/remove.svg';

const Search = (props) => {
  const {
    searchTerm, setSearchTerm, setSearching,
  } = props;

  const searchLoader = () => {
    setSearching(true);
    setTimeout(() => setSearching(false), 1000);
  };

  function addSearchTerm(value) {
    if (searchTerm.indexOf(value) > -1) {
      return false;
    }
    setSearchTerm([...searchTerm, value]);
    searchLoader();
    return true;
  }

  const removeSearchTerm = (value) => {
    const filteredList = searchTerm.filter((item) => item !== value);
    setSearchTerm(filteredList);
  };

  return (
    <Box className="wrap">
      <Box position="relative" className="search-bar">
        <img src={MagnifyingGlass} alt="MagnifyingGlass" />
        <ChipInput
          variant="outlined"
          onBeforeAdd={addSearchTerm}
          defaultValue={[]}
          value={searchTerm}
          placeholder="Filter by Name"
          fullWidth
          chipRenderer={(
            {
              value,
              className,
            },
            key,
          ) => (
            <Chip
              key={key}
              className={className}
              onDelete={() => removeSearchTerm(value)}
              label={value}
              deleteIcon={<IconButton><img src={REMOVE} alt="REMOVE" /></IconButton>}
            />
          )}
        />

        {searchTerm.length ? (
          <IconButton onClick={() => setSearchTerm([])}>
            <img src={CLOSE} alt="CLOSE" />
          </IconButton>
        ) : null}
      </Box>

      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="caption">Filter by Developmental Stage</Typography>
      </Box>
      <DevelopmentalStageFilter setSearching={searchLoader} />
    </Box>
  );
};

export default Search;

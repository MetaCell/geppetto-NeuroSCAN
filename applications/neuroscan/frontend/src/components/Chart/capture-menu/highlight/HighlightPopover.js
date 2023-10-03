import React, { useState } from 'react';
import { Popover, Box, Typography } from '@material-ui/core';
import SearchBar from '../../../SearchBar';
import GroupedResults from './GroupedResults';

const HighlightPopover = ({ open, anchorEl, onClose }) => {
  // State for search terms
  const [searchTerms, setSearchTerms] = useState([]);

  // Method to add a new search term
  const addSearchTerm = (term) => {
    if (!searchTerms.includes(term)) {
      setSearchTerms((prevTerms) => [...prevTerms, term]);
    }
  };

  // Method to remove a search term
  const removeSearchTerm = (term) => {
    setSearchTerms((prevTerms) => prevTerms.filter((t) => t !== term));
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <Box p={2}>
        <Typography variant="h6">Highlight Neurons</Typography>
      </Box>
      <SearchBar
        searchTerms={searchTerms}
        setSearchTerms={setSearchTerms}
        addSearchTerm={addSearchTerm}
        removeSearchTerm={removeSearchTerm}
      />
      <GroupedResults />
    </Popover>
  );
};

export default HighlightPopover;

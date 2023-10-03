import React from 'react';
import { Box, Chip, IconButton } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import MagnifyingGlass from '../images/magnifying-glass.svg';
import CLOSE from '../images/icon-close.svg';
import REMOVE from '../images/remove.svg';

const SearchBar = ({
  searchTerms, setSearchTerms, addSearchTerm, handlePaste, removeSearchTerm,
}) => (
  <Box position="relative" className="search-bar">
    <img src={MagnifyingGlass} alt="MagnifyingGlass" />
    <ChipInput
      variant="outlined"
      onBeforeAdd={(chip) => addSearchTerm(chip)}
      onPaste={(event) => handlePaste(event)}
      defaultValue={[]}
      value={searchTerms}
      placeholder="Search here"
      fullWidth
      chipRenderer={(
        { value, className },
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
    {searchTerms.length ? (
      <IconButton onClick={() => setSearchTerms([])}>
        <img src={CLOSE} alt="CLOSE" />
      </IconButton>
    ) : null}
  </Box>
);

export default SearchBar;

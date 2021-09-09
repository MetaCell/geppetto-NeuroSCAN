import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box, Typography, IconButton, Chip,
} from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import MagnifyingGlass from '../../images/magnifying-glass.svg';
import DevelopmentalStageFilter from '../Common/DevelopmentalStageFilter';
import * as search from '../../redux/actions/search';
import CLOSE from '../../images/icon-close.svg';
import REMOVE from '../../images/remove.svg';

const Search = (props) => {
  const dispatch = useDispatch();
  const {
    searchTerms, setSearchTerms,
    developmentalStage, setDevelopmentalStage,
  } = props;

  useEffect(() => {
    dispatch(search.updateFilters({
      searchTerms,
      developmentalStage,
    }));
  }, [searchTerms, developmentalStage]);

  function addSearchTerm(value) {
    if (searchTerms.indexOf(value) > -1) {
      return false;
    }
    setSearchTerms([...searchTerms, value]);
    return true;
  }

  const removeSearchTerm = (value) => {
    const filteredList = searchTerms.filter((item) => item !== value);
    setSearchTerms(filteredList);
  };

  return (
    <Box className="wrap">
      <Box position="relative" className="search-bar">
        <img src={MagnifyingGlass} alt="MagnifyingGlass" />
        <ChipInput
          variant="outlined"
          onBeforeAdd={(chip) => addSearchTerm(chip)}
          defaultValue={[]}
          value={searchTerms}
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

        {searchTerms.length ? (
          <IconButton onClick={() => setSearchTerms([])}>
            <img src={CLOSE} alt="CLOSE" />
          </IconButton>
        ) : null}
      </Box>

      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="caption">Filter by Developmental Stage</Typography>
      </Box>
      <DevelopmentalStageFilter
        setDevelopmentalStage={setDevelopmentalStage}
        developmentalStage={developmentalStage}
      />
    </Box>
  );
};

export default Search;

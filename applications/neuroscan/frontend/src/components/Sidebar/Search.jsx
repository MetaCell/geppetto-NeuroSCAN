import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box, Chip, IconButton, Typography,
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
    timePoint, setTimePoint,
  } = props;

  useEffect(() => {
    dispatch(search.updateFilters({
      searchTerms,
      timePoint,
    }));
  }, [searchTerms, timePoint]);

  function addSearchTerm(value) {
    if (searchTerms.indexOf(value) > -1) {
      return false;
    }
    setSearchTerms([...searchTerms, value]);
    return true;
  }

  const parseTextToTags = (text) => {
    const trimmedText = text.trim();
    const separators = [',', '\n', '\t'];
    const splitTags = trimmedText.split(new RegExp(separators.join('|'), 'g'));
    return splitTags.filter((tag) => tag.trim() !== '');
  };
  const handlePaste = (event) => {
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedText = clipboardData.getData('Text');
    const parsedTags = parseTextToTags(pastedText);
    setSearchTerms([...searchTerms, ...parsedTags]);
    event.preventDefault();
  };

  const removeSearchTerm = (value) => {
    const filteredList = searchTerms.filter((item) => item !== value);
    setSearchTerms(filteredList);
  };

  return (
    <Box className="wrap">
      <Box position="relative" className="search-bar" id="search-bar">
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
        <Typography variant="caption">Slide to select one time point</Typography>
      </Box>
      <DevelopmentalStageFilter
        timePoint={timePoint}
        setTimePoint={setTimePoint}
      />
    </Box>
  );
};

export default Search;

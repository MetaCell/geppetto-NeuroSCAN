import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box, Typography,
} from '@material-ui/core';
import DevelopmentalStageFilter from '../Common/DevelopmentalStageFilter';
import * as search from '../../redux/actions/search';
import SearchBar from '../SearchBar';

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

  const addSearchTerm = (value) => {
    if (searchTerms.indexOf(value) > -1) {
      return false;
    }
    setSearchTerms([...searchTerms, value]);
    return true;
  };

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
      <SearchBar
        searchTerms={searchTerms}
        setSearchTerms={setSearchTerms}
        addSearchTerm={addSearchTerm}
        handlePaste={handlePaste}
        removeSearchTerm={removeSearchTerm}
      />

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

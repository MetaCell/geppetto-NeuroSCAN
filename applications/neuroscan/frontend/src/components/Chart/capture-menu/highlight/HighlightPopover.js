import React, { useState, useMemo } from 'react';
import {
  Popover, Box, Typography, Divider,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import SearchBar from '../../../SearchBar';
import GroupedResults from './GroupedResults';

const extractInstanceNames = (name) => name.split(/[ ,]/)
  .filter((str) => str && !str.startsWith('(') && !str.endsWith(')'))
  .map((str) => str.trim());

const anchorOriginProps = {
  vertical: 'bottom',
  horizontal: 'center',
};

const transformOriginProps = {
  vertical: 'top',
  horizontal: 'left',
};

const HighlightPopover = ({
  open, anchorEl, onClose, viewerId,
}) => {
  const viewerData = useSelector((state) => state.widgets[viewerId]);
  const instanceNames = (viewerData?.config?.instances || [])
    .flatMap((instance) => extractInstanceNames(instance.name));
  const instanceNamesSet = new Set(instanceNames);

  const [searchTerms, setSearchTerms] = useState([]);

  // Memoized variables
  const allNames = useMemo(() => Array.from(instanceNamesSet), [instanceNamesSet]);

  const options = useMemo(() => {
    if (searchTerms.length === 0) return allNames;

    return allNames.filter((name) => searchTerms
      .some((term) => name.toUpperCase().includes(term.toUpperCase())));
  }, [allNames, searchTerms]);

  const addSearchTerm = (term) => {
    if (term.trim() === '') {
      return false;
    }

    if (!searchTerms.includes(term.toUpperCase())) {
      setSearchTerms((prevTerms) => [...prevTerms, term.toUpperCase()]);
    }
    return true;
  };

  const removeSearchTerm = (term) => {
    setSearchTerms((prevTerms) => prevTerms.filter((t) => t !== term.toUpperCase()));
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={anchorOriginProps}
      transformOrigin={transformOriginProps}
      className="custom-popover highlight-popover"
    >
      <Box sx={{
        padding: '1rem .5rem .5rem 1rem',
      }}
      >
        <Typography variant="h6">Highlight Neurons</Typography>
      </Box>
      <Divider />
      <Box sx={{
        padding: '.5rem',
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          boxShadow: '0 0 0 0.125rem rgba(76, 39, 106, 0.15)',
        },
        '& .MuiOutlinedInput-root': {
          borderRadius: '0.125rem',
        },
      }}
      >
        <SearchBar
          searchTerms={searchTerms}
          setSearchTerms={setSearchTerms}
          addSearchTerm={addSearchTerm}
          removeSearchTerm={removeSearchTerm}
        />
      </Box>
      <Divider style={{ marginBottom: '0.5rem' }} />
      <GroupedResults viewerId={viewerId} options={options} />
    </Popover>
  );
};

export default HighlightPopover;

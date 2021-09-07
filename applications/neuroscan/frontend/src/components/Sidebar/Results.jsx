import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import NEURON from '../../images/neuron.svg';
import CONTACTS from '../../images/contacts.svg';
import CircularLoader from '../Common/Loader';
import AddToViewerMenu from './AddToViewerMenu';
import SearchResult from '../Common/SearchResult';

const list = [
  {
    title: 'Neurons',
    resultItem: 'neurons',
    image: NEURON,
  },
  {
    title: 'Contacts',
    resultItem: 'contacts',
    image: CONTACTS,
  },
  {
    title: 'Synapses',
    resultItem: 'synapses',
    image: CONTACTS,
  },
];

const viewers = [
  {
    title: 'Morphology Viewer 1',
    id: 'Viewer_1',
    disabled: false,
  },
  {
    title: 'Morphology Viewer 2',
    id: 'Viewer_2',
    disabled: false,
  },
  {
    title: 'Morphology Viewer 3',
    id: 'Viewer_3',
    disabled: true,
  },
  {
    title: 'Morphology Viewer 4',
    id: 'Viewer_4',
    disabled: true,
  },
  {
    title: 'Morphology Viewer 5',
    id: 'Viewer_5',
    disabled: false,
  },
];

const Results = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const searchesCount = useSelector((state) => state.search.searchesCount);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className="wrap">
      <Typography component="h3">
        Results
        { searchesCount > 0 ? <CircularLoader /> : null }
      </Typography>
      {
        list.map((record, index) => (
          <SearchResult
            id={index}
            title={record?.title}
            resultItem={record?.resultItem}
            image={record?.image}
            handleClick={handleClick}
          />
        ))
      }
      <AddToViewerMenu handleClose={handleClose} anchorEl={anchorEl} viewers={viewers} />
    </Box>
  );
};

export default Results;

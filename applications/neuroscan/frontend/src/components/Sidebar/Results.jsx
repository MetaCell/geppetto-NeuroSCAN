import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import CircularLoader from '../Common/Loader';
import AddToViewerMenu from './AddToViewerMenu';
import SearchResult from '../Common/SearchResult';
import NEURON from '../../images/neuron.svg';
import CONTACTS from '../../images/contacts.svg';
import SYNAPSES from '../../images/synapses.svg';
import { addInstances } from '../../redux/actions/widget';
import { mapToInstance } from '../../services/instanceHelpers';

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
    image: SYNAPSES,
  },
];

const Results = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentItem, setCurrentItem] = React.useState(null);
  const dispatch = useDispatch();

  const searchesCount = useSelector((state) => state.search.searchesCount);

  const handleClick = (event, selectedItem) => {
    setCurrentItem(selectedItem);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setCurrentItem(null);
    setAnchorEl(null);
  };

  const handleAddToViewer = (viewerId = null) => {
    const instances = [mapToInstance(currentItem)];
    dispatch(addInstances(viewerId, instances));
    handleClose();
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
            key={`results-${index}`}
            title={record?.title}
            resultItem={record?.resultItem}
            image={record?.image}
            service={record?.service}
            handleClick={handleClick}
          />
        ))
      }
      <AddToViewerMenu
        handleClose={handleClose}
        handleAddToViewer={handleAddToViewer}
        anchorEl={anchorEl}
      />
    </Box>
  );
};

export default Results;

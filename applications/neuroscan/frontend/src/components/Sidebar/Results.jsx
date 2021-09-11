import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import NEURON from '../../images/neuron.svg';
import CONTACTS from '../../images/contacts.svg';
import CircularLoader from '../Common/Loader';
import AddToViewerMenu from './AddToViewerMenu';
import SearchResult from '../Common/SearchResult';
import { addViewer, addInstancesViewer } from '../../redux/actions/viewers';
import { backendURL, VIEWERS } from '../../utilities/constants';

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

const mapToInstance = (item) => {
  const fileName = item.files.length > 0 ? item.files[0].name : '';
  const location = item.files.length > 0 ? `${backendURL}${item.files[0].url}` : '';
  return {
    id: item.id,
    uid: `i${item.uid.replace(/-/g, '')}`,
    content: {
      type: 'url',
      location,
      fileName,
    },
    getId: () => this.id,
  };
};

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

  const handleAddToViewer = async (viewerId = null) => {
    if (viewerId === null) {
      // add to new viewer
      dispatch(addViewer(VIEWERS.InstanceViewer, [mapToInstance(currentItem)]));
    } else {
      dispatch(addInstancesViewer(viewerId, [mapToInstance(currentItem)]));
    }
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

import React from 'react';
import {
  Accordion,
  Box,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
} from '@material-ui/core';
import NEURON from '../../images/neuron.svg';
import CONTACTS from '../../images/contacts.svg';
import CHEVRON from '../../images/chevron-right.svg';
import CircularLoader from '../Common/Loader';
import AddToViewerMenu from './AddToViewerMenu';

const useStyles = makeStyles(() => ({
  fade: {
    opacity: 0.3,
    filter: 'grayscale(1)',
    pointerEvents: 'none',
  },
}));

const list = [
  {
    title: 'Neurons',
    items: ['Neuron AX1900', 'Neuron AX1900', 'Neuron AX1900', 'Neuron AX1900', 'Neuron AX1900', 'Neuron AX1900', 'Neuron AX1900'],
    image: NEURON,
    count: 320,
  },
  {
    title: 'Contacts',
    items: ['Contacts AX1900', 'Contacts AX1900', 'Contacts AX1900', 'Contacts AX1900'],
    image: CONTACTS,
    count: 120.450,
  },
  {
    title: 'Synapses',
    items: ['Synapses AX1900', 'Synapses AX1900', 'Synapses AX1900', 'Synapses AX1900', 'Synapses AX1900'],
    image: CONTACTS,
    count: 2.201,
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

const Results = ({ searching }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

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
        { searching ? <CircularLoader /> : null }
      </Typography>
      {
        list.map((record, index) => (
          <Accordion key={index} className={searching ? classes.fade : ''}>
            <AccordionSummary
              expandIcon={<img src={CHEVRON} width="4" height="6" alt="CHEVRON" />}
              IconButtonProps={{ disableRipple: true }}
            >
              <Typography variant="h5">
                {record?.title}
                <Typography variant="caption">{`${record?.count} items`}</Typography>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List component="nav">
                { record?.items.map((item, i) => (
                  <ListItem key={item + i}>
                    <ListItemIcon>
                      <img src={record?.image} width="10" height="10" alt={record?.title} />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                    <Button disableElevation aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} color="primary" variant="contained">
                      Add to
                    </Button>
                  </ListItem>
                ))}
              </List>
              <Button variant="outlined">
                See more
              </Button>
            </AccordionDetails>
          </Accordion>
        ))
      }
      <AddToViewerMenu handleClose={handleClose} anchorEl={anchorEl} viewers={viewers} />
    </Box>
  );
};

export default Results;

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

const Results = ({ searching }) => {
  const classes = useStyles();
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
                    <Button disableElevation color="primary" variant="contained">
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
    </Box>
  );
};

export default Results;

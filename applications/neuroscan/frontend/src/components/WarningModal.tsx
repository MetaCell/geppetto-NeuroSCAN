import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Modal,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
} from '@material-ui/core';
import { CONTACT_TYPE, NEURON_TYPE, SYNAPSE_TYPE } from '../utilities/constants';
import CLOSE from '../images/close.svg';
// eslint-disable-next-line import/no-cycle
import { getInstancesOfType } from '../services/instanceHelpers';
import {
  NeuronsIcon, ContactsIcon, SynapsesIcon, ExpandIcon, InstancesIcon,
} from '../assets/icons';
import vars from '../styles/constants';

const {
  lightBlackColor,
} = vars;
const renderAccordion = (title: string, items:any, Icon: any) => (
  <Accordion defaultExpanded className="warning-modal">
    <AccordionSummary
      expandIcon={<ExpandIcon fontSize="small" />}
      IconButtonProps={{ disableRipple: true }}
    >
      <Box display="flex" alignItems="center">
        <Icon style={{
          margin: '0 0.5rem',
        }}
        />
        <Typography
          variant="body1"
          style={{
            color: lightBlackColor,
          }}
        >
          {title}
        </Typography>
      </Box>

    </AccordionSummary>
    <AccordionDetails>
      <List component="nav">
        {items.map((item: any, i: number) => (
          <ListItem key={`${item}-${i}`} style={{ padding: '0 3rem' }}>
            <ListItemIcon><InstancesIcon /></ListItemIcon>
            <ListItemText primary={item.uidFromDb} />
          </ListItem>
        ))}
      </List>
    </AccordionDetails>
  </Accordion>
);

const WarningModal = (props: any) => {
  const { open, handleClose, instances } = props;
  const neurons = getInstancesOfType(instances, NEURON_TYPE) || [];
  const contacts = getInstancesOfType(instances, CONTACT_TYPE) || [];
  const synapses = getInstancesOfType(instances, SYNAPSE_TYPE) || [];

  return (
    <Modal open={open} className="primary-modal" onClose={handleClose}>
      <Box className="modal-dialog">
        <Box className="modal-header">
          <Typography>Missing data</Typography>
          <IconButton
            color="inherit"
            onClick={handleClose}
            disableFocusRipple
            disableRipple
          >
            <img src={CLOSE} alt="Close" />
          </IconButton>
        </Box>
        <Box
          className="modal-body"
          style={{
            height: '24.5rem',
            overflow: 'auto',
          }}
        >
          <Typography style={{ marginBottom: '1.5rem' }}>
            Warning: you moved to a timepoint where the following data are not present
            and will be lost from the current viewer.
          </Typography>
          {neurons?.length !== 0 && renderAccordion('Neurons', neurons, NeuronsIcon)}
          {contacts?.length !== 0 && renderAccordion('Contacts', contacts, ContactsIcon)}
          {synapses?.length !== 0 && renderAccordion('Synapses', synapses, SynapsesIcon)}
        </Box>
        <Box className="modal-footer">
          <Button disableElevation color="primary" variant="contained" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default WarningModal;

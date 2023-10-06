import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import CHEVRON from '../../../../images/chevron-right.svg';
import { ReactComponent as NeuronIcon } from '../../../../images/neuron.svg';
import { toggleInstanceHighlight } from '../../../../redux/actions/widget';

const GroupedResults = ({ viewerId, options }) => {
  const dispatch = useDispatch();
  const highlightedInstances = useSelector(
    (state) => state.widgets[viewerId]?.config?.highlightedInstances || [],
  );

  const isOptionSelected = (optionName) => highlightedInstances.includes(optionName);

  const toggleHighlight = (optionName) => {
    dispatch(toggleInstanceHighlight(viewerId, optionName));
  };

  const renderOptionsList = (optionsToRender) => (
    <List component="nav">
      {optionsToRender.map((optionName) => (
        <ListItem
          button
          key={optionName}
          onClick={() => toggleHighlight(optionName)}
        >
          <ListItemIcon>
            <NeuronIcon style={isOptionSelected(optionName) ? { fill: 'purple' } : {}} />
          </ListItemIcon>
          <ListItemText primary={optionName} />
        </ListItem>
      ))}
    </List>
  );

  const { selectedOptions, unselectedOptions } = options.reduce((acc, option) => {
    if (isOptionSelected(option)) {
      acc.selectedOptions.push(option);
    } else {
      acc.unselectedOptions.push(option);
    }
    return acc;
  }, { selectedOptions: [], unselectedOptions: [] });

  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<img src={CHEVRON} width="4" height="6" alt="CHEVRON" />}>
          <Typography variant="h5" style={{ flexGrow: 1 }}>Selected</Typography>
          <Typography>{selectedOptions.length}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {renderOptionsList(selectedOptions)}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<img src={CHEVRON} width="4" height="6" alt="CHEVRON" />}>
          <Typography variant="h5" style={{ flexGrow: 1 }}>Unselected</Typography>
          <Typography>{unselectedOptions.length}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {renderOptionsList(unselectedOptions)}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default GroupedResults;

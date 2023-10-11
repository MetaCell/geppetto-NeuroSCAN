import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon, Box, Button, makeStyles,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import CHEVRON from '../../../../images/chevron-right.svg';
import { ReactComponent as NeuronIcon } from '../../../../images/neuron.svg';
import { toggleInstanceHighlight } from '../../../../redux/actions/widget';

const useStyles = makeStyles({
  button: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
});
const GroupedResults = ({ viewerId, options }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

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
            <NeuronIcon style={isOptionSelected(optionName) ? { fill: '#77478F' } : {}} />
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
    <Box>
      <Accordion>
        <AccordionSummary
          expandIcon={<img src={CHEVRON} width="4" height="6" alt="CHEVRON" />}
        >
          <Typography variant="h5">
            Selected
            {
              selectedOptions.length === 0
                ? <Typography variant="caption">{`${selectedOptions.length} item`}</Typography>
                : (
                  <Button variant="text" className={classes.button}>
                    <Typography variant="caption">{`Deselect ${selectedOptions.length} ${selectedOptions.length <= 1 ? 'item' : 'items'}`}</Typography>
                  </Button>
                )
            }
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {renderOptionsList(selectedOptions)}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<img src={CHEVRON} width="4" height="6" alt="CHEVRON" />}>
          <Typography variant="h5">
            Unselected
            <Typography variant="caption">
              {unselectedOptions.length}
              {' '}
              {unselectedOptions.length <= 1 ? 'item' : 'items'}
            </Typography>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {renderOptionsList(unselectedOptions)}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default GroupedResults;

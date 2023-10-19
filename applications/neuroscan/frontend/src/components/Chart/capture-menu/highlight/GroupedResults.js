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
  Checkbox,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import CHEVRON from '../../../../images/chevron-right.svg';
import { ReactComponent as NeuronIcon } from '../../../../images/neuron.svg';
import { toggleInstanceHighlight } from '../../../../redux/actions/widget';
import vars from '../../../../styles/constants';

const useStyles = makeStyles({
  button: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  selected: {
    background: vars.selectedBgColor, // Background color when selected but not hovered
    '& .MuiTypography-root': {
      color: '#77478F',
    },
    '&:hover': {
      background: `${vars.selectedHoverBgColor} !important`,
      '& .MuiTypography-root': {
        color: vars.primaryColor,
      },
    },
  },
  expanded: {
    '&.Mui-expanded': {
      background: vars.selectedExpandedBgColor,
    },
  },
});

const CustomCheckedIcon = ({ fill }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8.25 2.56699C8.0953 2.47767 7.9047 2.47767 7.75 2.56699L3.41987 5.06699C3.26517 5.1563 3.16987 5.32137 3.16987 5.5V10.5C3.16987 10.6786 3.26517 10.8437 3.41987 10.933L7.75 13.433C7.9047 13.5223 8.0953 13.5223 8.25 13.433L12.5801 10.933C12.7348 10.8437 12.8301 10.6786 12.8301 10.5V5.5C12.8301 5.32137 12.7348 5.1563 12.5801 5.06699L8.25 2.56699Z"
      fill={fill}
      stroke="#4C276A"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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
          className={isOptionSelected(optionName) ? classes.selected : ''}
        >
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={isOptionSelected(optionName)}
              tabIndex={-1}
              disableRipple
              icon={<CustomCheckedIcon fill="none" />}
              checkedIcon={<CustomCheckedIcon fill="#77478F" />}
            />
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

  const handleDeselectClick = () => {
    selectedOptions.forEach((optionName) => toggleHighlight(optionName));
  };

  return (
    <Box>
      <Accordion>
        <AccordionSummary
          expandIcon={<img src={CHEVRON} width="8" height="8" alt="CHEVRON" />}
          className={classes.expanded}
        >
          <Typography variant="h5">
            Selected
            {
              selectedOptions.length === 0
                ? <Typography variant="caption">{`${selectedOptions.length} item`}</Typography>
                : (
                  <Button variant="text" className={classes.button} onClick={handleDeselectClick} disableRipple>
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
        <AccordionSummary
          expandIcon={<img src={CHEVRON} width="8" height="8" alt="CHEVRON" />}
        >
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

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
import CHEVRON from '../../../../images/chevron-right.svg';

// Sample data
const mockData = [
  { id: 1, name: 'Result 1', selected: true },
  { id: 2, name: 'Result 2', selected: true },
  { id: 3, name: 'Result 3', selected: false },
];

const GroupedResults = () => {
  // Group results by selected status
  const grouped = mockData.reduce((acc, curr) => {
    acc[curr.selected ? 'selected' : 'notSelected'].push(curr);
    return acc;
  }, { selected: [], notSelected: [] });

  const toggleSelect = (id) => {
    // Logic to toggle the selected status of an item
    console.log('Toggled item with ID:', id);
  };

  const ResultGroup = ({ title, items }) => (
    <Accordion>
      <AccordionSummary expandIcon={<img src={CHEVRON} width="4" height="6" alt="CHEVRON" />}>
        <Typography variant="h5">
          {title}
          <Typography variant="caption">{`${items.length} items`}</Typography>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List component="nav">
          {items.map((item) => (
            <ListItem button key={item.id} onClick={() => toggleSelect(item.id)}>
              <ListItemIcon>
                <div style={{ width: '20px', height: '20px', background: '#ccc' }} />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );

  return (
    <div>
      <ResultGroup title="Selected" items={grouped.selected} />
      <ResultGroup title="Unselected" items={grouped.notSelected} />
    </div>
  );
};

export default GroupedResults;

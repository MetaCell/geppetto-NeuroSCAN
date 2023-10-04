import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Accordion,
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
import HTMLViewer from '@metacell/geppetto-meta-ui/html-viewer/HTMLViewer';
import Checkbox from '@material-ui/core/Checkbox';
import CHEVRON from '../../images/chevron-right.svg';
import * as search from '../../redux/actions/search';

const useStyles = makeStyles(() => ({
  fade: {
    opacity: 0.3,
    filter: 'grayscale(1)',
    pointerEvents: 'none',
  },
}));

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
const SearchResult = (props) => {
  const {
    title,
    resultItem,
    handleClick,
    selectedItems,
    setSelectedItems,
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const results = useSelector((state) => state.search.results[resultItem]);
  const searchesCount = useSelector((state) => state.search.searchesCount);
  const count = useSelector((state) => state.search.counters[resultItem]);

  const handleCheckboxChange = (item) => {
    if (selectedItems[resultItem].includes(item)) {
      setSelectedItems({
        ...selectedItems,
        [resultItem]: selectedItems[resultItem].filter((selectedItem) => selectedItem !== item),
      });
    } else {
      setSelectedItems({
        ...selectedItems,
        [resultItem]: [...selectedItems[resultItem], item],
      });
    }
  };

  const handleLoadMore = (entity) => {
    dispatch(search.loadMore({ entity }));
  };

  return (
    <>
      <Accordion className={searchesCount > 0 ? classes.fade : ''} id={`${title}-result`}>
        <AccordionSummary
          expandIcon={<img src={CHEVRON} width="4" height="6" alt="CHEVRON" />}
          IconButtonProps={{ disableRipple: true }}
        >
          <Typography variant="h5">
            {title}
            {
              selectedItems[resultItem].length === 0
                ? <Typography variant="caption">{`${count} items`}</Typography>
                : (
                  <Button variant="text" onClick={() => setSelectedItems([])}>
                    <Typography variant="caption">{`Deselect ${selectedItems[resultItem].length} items`}</Typography>
                  </Button>
                )
             }
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List component="nav">
            {results && results.items.length > 0
              ? results.items.map((item, i) => (
                <ListItem key={`results-${resultItem}-listitem-${i}`}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selectedItems[resultItem].includes(item)}
                      tabIndex={-1}
                      disableRipple
                      onChange={() => handleCheckboxChange(item)}
                      icon={<CustomCheckedIcon fill="none" />}
                      checkedIcon={<CustomCheckedIcon fill="#77478F" />}
                    />
                  </ListItemIcon>
                  <ListItemText primary={(
                    <HTMLViewer
                      content={item.name}
                      style={{
                        width: '100%', height: '100%', float: 'center',
                      }}
                    />
                        )}
                  />
                  <Button
                    disableElevation
                    aria-haspopup="true"
                    onClick={(event) => handleClick(event, item)}
                    color="primary"
                    variant="contained"
                  >
                    Add to
                  </Button>
                </ListItem>
              ))
              : <div />}
          </List>
          <Button variant="outlined" onClick={() => handleLoadMore(resultItem)}>
            See more
          </Button>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default SearchResult;

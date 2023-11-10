import React, { useEffect, useRef, useState } from 'react';
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
import vars from '../../styles/constants';
import { getAll } from '../../redux/actions/search';

const useStyles = makeStyles(() => ({
  fade: {
    opacity: 0.3,
    filter: 'grayscale(1)',
    pointerEvents: 'none',
  },
  listItem: {
    '&:hover': {
      background: `${vars.selectedExpandedBgColor} !important`, // Background color when hovered but not selected
    },
    '&.selected': {
      background: vars.selectedBgColor, // Background color when selected but not hovered
      '& .MuiTypography-root': {
        color: '#77478F',
      },
    },
    '&:hover.selected': {
      background: `${vars.selectedHoverBgColor} !important`, // Background color when both selected and hovered
      '& .MuiTypography-root': {
        color: vars.primaryColor,
      },
      '& svg path': {
        fill: vars.primaryColor,
        stroke: '#341C59',
      },
    },
    '& .MuiIconButton-root': {
      padding: '8px !important',
    },
  },
}));

const CustomCheckedIcon = ({ fill, stroke }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8.25 2.56699C8.0953 2.47767 7.9047 2.47767 7.75 2.56699L3.41987 5.06699C3.26517 5.1563 3.16987 5.32137 3.16987 5.5V10.5C3.16987 10.6786 3.26517 10.8437 3.41987 10.933L7.75 13.433C7.9047 13.5223 8.0953 13.5223 8.25 13.433L12.5801 10.933C12.7348 10.8437 12.8301 10.6786 12.8301 10.5V5.5C12.8301 5.32137 12.7348 5.1563 12.5801 5.06699L8.25 2.56699Z"
      fill={fill}
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const SearchResult = (props) => {
  const {
    title,
    resultItem,
    image,
    handleClick,
    selectedItems,
    setSelectedItems,
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const results = useSelector((state) => state.search.results[resultItem]);
  const allItems = useSelector((state) => state.search.allItems[resultItem]);
  const searchesCount = useSelector((state) => state.search.searchesCount);
  const count = useSelector((state) => state.search.counters[resultItem]);
  const [isHovered, setIsHovered] = useState(false);

  const isItemSelected = (obj1, obj2) => Object.keys(obj1).length === Object.keys(obj2).length
      && Object.keys(obj1).every((key) => obj1[key] === obj2[key]);
  const handleCheckboxChange = (item) => {
    if (selectedItems[resultItem].some((obj) => isItemSelected(obj, item))) {
      setSelectedItems({
        ...selectedItems,
        [resultItem]: selectedItems[resultItem]
          .filter((selectedItem) => !isItemSelected(selectedItem, item)),
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
  const handleDeselectItems = (entity) => {
    const updatedSelectedItems = { ...selectedItems };
    updatedSelectedItems[entity] = [];
    setSelectedItems(updatedSelectedItems);
  };

  const listRef = useRef(null);
  const handleSelectAll = (entity) => {
    dispatch(search.getAll({ entity: resultItem }));
  };

  useEffect(() => {
    if (allItems?.items?.length > 0) {
      setSelectedItems({
        ...selectedItems,
        [resultItem]: allItems.items,
      });
    }
  }, [allItems]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        listRef.current
        && listRef.current.scrollTop + listRef.current.clientHeight
        >= listRef.current.scrollHeight
      ) {
        // Scroll reached the end of the list, load more data
        handleLoadMore(resultItem);
      }
    };

    if (listRef.current) {
      listRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (listRef.current) {
        listRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [resultItem]);

  return (
    <>
      <Accordion className={searchesCount > 0 ? classes.fade : ''} id={`${title}-result`}>
        <AccordionSummary
          expandIcon={<img src={CHEVRON} width="auto" height="auto" alt="CHEVRON" />}
          IconButtonProps={{ disableRipple: true }}
        >
          <Typography variant="h5">
            {title}
            {
              selectedItems[resultItem].length === 0
                ? (
                  <Button
                    variant="text"
                    onClick={handleSelectAll}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <Typography variant="caption">
                      {isHovered ? `Select ${count} items` : `${count} items`}
                    </Typography>
                  </Button>
                )
                : (
                  <Button variant="text" onClick={() => handleDeselectItems(resultItem)}>
                    <Typography variant="caption">{`Deselect ${selectedItems[resultItem].length} items`}</Typography>
                  </Button>
                )
            }
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List component="nav" ref={listRef}>
            {results && results.items.length > 0
              ? results.items.map((item, i) => (
                <ListItem
                  key={`results-${resultItem}-listitem-${i}`}
                  className={`${classes.listItem} ${selectedItems[resultItem]
                    .some((obj) => isItemSelected(obj, item)) ? 'selected' : ''}`}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selectedItems[resultItem].some((obj) => isItemSelected(obj, item))}
                      tabIndex={-1}
                      disableRipple
                      onChange={() => handleCheckboxChange(item)}
                      icon={<CustomCheckedIcon fill="none" stroke="#8C8C8C" />}
                      checkedIcon={<CustomCheckedIcon fill="#77478F" stroke={vars.primaryColor} />}
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
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default SearchResult;

import React, { useEffect, useRef } from 'react';
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
import CHEVRON from '../../images/chevron-right.svg';
import * as search from '../../redux/actions/search';

const useStyles = makeStyles(() => ({
  fade: {
    opacity: 0.3,
    filter: 'grayscale(1)',
    pointerEvents: 'none',
  },
}));

const SearchResult = (props) => {
  const {
    title,
    resultItem,
    image,
    handleClick,
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const results = useSelector((state) => state.search.results[resultItem]);
  const searchesCount = useSelector((state) => state.search.searchesCount);
  const count = useSelector((state) => state.search.counters[resultItem]);

  const handleLoadMore = (entity) => {
    dispatch(search.loadMore({
      entity,
    }));
  };

  const listRef = useRef(null);

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
          expandIcon={<img src={CHEVRON} width="4" height="6" alt="CHEVRON" />}
          IconButtonProps={{ disableRipple: true }}
        >
          <Typography variant="h5">
            {title}
            <Typography variant="caption">{`${count} items`}</Typography>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List component="nav" ref={listRef}>
            {results && results.items.length > 0
              ? results.items.map((item, i) => (
                <ListItem key={`results-${resultItem}-listitem-${i}`}>
                  <ListItemIcon>
                    <img src={image} width="10" height="10" alt={title} />
                  </ListItemIcon>
                  {/* <ListItemText primary={item.name} /> */}
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

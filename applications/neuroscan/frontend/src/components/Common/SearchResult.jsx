import React from 'react';
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
    id,
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

  return (
    <>
      <Accordion key={id} className={searchesCount > 0 ? classes.fade : ''}>
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
          <List component="nav">
            {results && results.items.length > 0
              ? results.items.map((item, i) => (
                <ListItem key={`${resultItem}-item-${i}`}>
                  <ListItemIcon>
                    <img src={image} width="10" height="10" alt={title} />
                  </ListItemIcon>
                  <ListItemText primary={item.uid} />
                  <Button disableElevation aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} color="primary" variant="contained">
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

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Box,
  Button,
  List,
  ListItem,
  makeStyles,
  Popover,
} from '@material-ui/core';
import Header from '../components/Header';
import { VIEWS, backendURL, PROMOTER_MEDIA_TYPES } from '../utilities/constants';
import ResultCard from '../components/PromoterResultCard/ResultCard';
import SubHeader from '../components/SubHeader';
import TIMELINE from '../images/timeline.svg';
import MODEL from '../images/modelnew.svg';
import DOWN from '../images/expand_less.svg';
import DevelopmentalStageFilter from '../components/PromoterSearch/DevelopmentalStageFilter';
import AutocompleteFilter from '../components/PromoterSearch/AutocompleteFilter';
import DevInputFilter from '../components/PromoterSearch/DevInputFilter';
import * as search from '../redux/actions/promoters';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      paddingTop: '2.5rem',
      '& .wrapper': {
        maxWidth: 'calc(100% - 4rem)',
      },
    },
    [theme.breakpoints.down('xs')]: {
      '& .wrapper': {
        maxWidth: 'calc(100% - 2rem)',
        '& .filters': {
          height: 'auto',
          display: 'block',
          padding: '0 0.75rem',
          '& .MuiListItem-root': {
            width: '100%',
            padding: '0.75rem 0',
            '&+ .MuiListItem-root': {
              '&::before': {
                height: '0.0625rem',
                width: '100%',
              },
            },
            '&:last-child': {
              width: '100%',
            },
          },
        },
        '& > p': {
          paddingBottom: '1rem',
          paddingTop: '0',
        },
        '& h1': {
          fontSize: '1.25rem',
          lineHeight: '1.938rem',
        },
      },
      '& .main-content': {
        height: 'auto',
        paddingTop: '0',
        '& .results-box_header': {
          display: 'block',
          '& h3': {
            marginBottom: '1rem',
          },
          '& .MuiChip-root': {
            marginBottom: '0.5rem',
          },
          '& .wrap p': {
            justifyContent: 'flex-start',
          },
        },
        '& .button-group': {
          padding: '1.75rem 0',
        },
      },
      '& .sub-header': {
        height: 'auto',
        paddingTop: '0',
        '& .wrapper p': {
          padding: '1rem 0',
          margin: 0,
        },
      },
      '& .results-wrap': {
        paddingBottom: '1.75rem',
      },
    },
  },
  left: {
    flexShrink: 0,
  },
  right: {
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      height: '100%',
    },
  },
}));

const dummyList = [
  { title: 'Pro 1', year: 1994 },
  { title: 'Pro 2', year: 1994 },
  { title: 'Pro 3', year: 1994 },
  { title: 'Pro 4', year: 1994 },
];

const dummyVideoPath = '/uploads/Syg_1_Promoter_Database_d0a6a5a002.mp4';

const promoter = {
  title: 'odr-2b3a',
  cellLineage: [
    {
      selected: true,
      label: 'AWA',
    },
    {
      selected: true,
      label: 'AIB',
    },
    {
      selected: false,
      label: 'AIB',
    },
    {
      selected: false,
      label: 'AIB',
    },
    {
      selected: false,
      label: 'AIB',
    },
    {
      selected: false,
      label: 'AIB',
    },
  ],
  timeline: [
    {
      label: 'Timeline',
      src: TIMELINE,
    },
  ],
  model: [
    {
      label: 'Model',
      src: MODEL,
    },
  ],
  expression: [
    {
      label: '3D Expression',
      src: `${backendURL}${dummyVideoPath}`,
      mediaType: PROMOTER_MEDIA_TYPES.video,
    },
  ],
  promoterVideos: [
    {
      label: 'Promoter',
      src: `${backendURL}${dummyVideoPath}`,
      mediaType: PROMOTER_MEDIA_TYPES.video,
    },
    {
      label: 'Histone Marker',
      src: '',
    },
  ],
  promoterInfo: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Porttitor non adipiscing dui sed. Morbi magna in et ac.
  Ullamcorper massa at pellentesque consectetur leo morbi.
  Tellus leo nunc sed nibh nec amet, eget non.`,
};

const results = [
  promoter,
  promoter,
  promoter,
];

const PromoterDB = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [timePoint, setTimePoint] = useState(0);
  const [selectedDevStage, setSelectedDevStage] = useState([]);
  const pdbState = useSelector((state) => state.promoterDB);
  const { promoters, count, filters } = useSelector((state) => state.promoterDB);
  const dispatch = useDispatch();

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDevStageMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const setTimePointAndStage = (value) => {
    setTimePoint(value);
    setSelectedDevStage([value]);
    dispatch(search.updateFilters({
      ...filters,
      timepoint: value,
    }));
  };
  const menuId = 'delevlopment-stage-menu';
  const renderMenu = (
    <Popover
      id={menuId}
      open={isMenuOpen}
      anchorEl={anchorEl}
      onClose={handleMenuClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <DevelopmentalStageFilter
        timePoint={timePoint}
        setTimePoint={setTimePointAndStage}
      />
    </Popover>
  );

  const handleLoadMore = ((e) => {
    dispatch(search.loadMorePromoters());
  });

  return (
    <Box className={classes.root}>
      <Box className="primary-structure height-auto" display="flex">
        <Box className={classes.left}>
          <Header view={VIEWS.promoterDB} />
        </Box>
        <Box className={classes.right}>
          <SubHeader view={VIEWS.promoterDB} />
        </Box>
      </Box>

      <Box className="sub-header">
        <Box className="wrapper">
          <Typography>Promoter DB</Typography>
          <Typography component="h1">Explore Promoters and Neurons in seconds.</Typography>
        </Box>
      </Box>

      <Box className="wrapper filter-box">
        <List className="filters">
          <ListItem>
            <AutocompleteFilter id="Promoter" options={dummyList} placeholder="Type or search a promoter" />
          </ListItem>
          <ListItem>
            <AutocompleteFilter id="Neurons" options={dummyList} placeholder="Type or search a neuron" />
          </ListItem>
          <ListItem>
            <DevInputFilter
              handleDevStageMenuOpen={handleDevStageMenuOpen}
              selectedDevStage={selectedDevStage}
              menuId={menuId}
            />
            {renderMenu}
          </ListItem>
          <ListItem>
            <Button color="primary" disableElevation variant="contained">
              Search
            </Button>
          </ListItem>
        </List>

      </Box>

      <Box className="main-content scrollbar">
        <Box className="wrapper">
          <Typography className="available-results">
            {`Available Results (${count})`}
          </Typography>

          <Box className="results-wrap scrollbar">
            {
              promoters.map((result, index) => <ResultCard key={`result_${index}`} result={result} />)
            }
          </Box>

          <Box className="button-group">
            <Button color="primary" disableElevation variant="contained" onClick={handleLoadMore}>
              Load More
            </Button>
            <Button variant="outlined">
              Load All
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PromoterDB;

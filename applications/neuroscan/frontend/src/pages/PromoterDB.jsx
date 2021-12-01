import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
import { VIEWS } from '../utilities/constants';
import ResultCard from '../components/PromoterResultCard/ResultCard';
import SubHeader from '../components/SubHeader';
import DevelopmentalStageFilter from '../components/PromoterSearch/DevelopmentalStageFilter';
import AutocompleteFilter from '../components/PromoterSearch/AutocompleteFilter';
import DevInputFilter from '../components/PromoterSearch/DevInputFilter';

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

const recordsPerPage = 5;

const PromoterDB = () => {
  const classes = useStyles();
  const [pageNumber, setPageNumber] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const devStages = useSelector((state) => state.devStages.promoterDB);
  const min = Math.min(...devStages.map((devStage) => devStage.begin));
  const [timePoint, setTimePoint] = useState(min);
  const { promoters } = useSelector((state) => state.promoterDB);
  const neurons = [...new Set(promoters.reduce((r, p) => (
    r.concat(
      p.cellsByLineaging
        .split(' ')
        .filter((e) => e.length > 0),
    )), [])),
  ].sort();
  const [selectedPromoters, setSelectedPromoters] = useState([]);
  const [selectedNeurons, setSelectedNeurons] = useState([]);
  const [selectedDevStage, setSelectedDevStage] = useState([]);
  const [filteredPromoters, setFilteredPromoters] = useState(promoters);

  const promoterOptions = promoters.map((p) => ({ title: p.uid }));
  const neuronOptions = neurons.map((n) => ({ title: n }));

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const setFilters = (pSelectedPromoters, pSelectedNeurons, pTimepoint) => {
    setSelectedPromoters(pSelectedPromoters);
    setSelectedNeurons(pSelectedNeurons);
    setTimePoint(pTimepoint);
    const fp = promoters.filter((p) => (
      pTimepoint === min
      || (p.timePointStart <= pTimepoint
      && p.timePointEnd > pTimepoint)
    )).filter((p) => (
      pSelectedPromoters.length === 0
      || pSelectedPromoters.find((sp) => sp.title === p.uid)
    )).filter((p) => (
      pSelectedNeurons.length === 0
      || p.cellsByLineaging.split(' ').filter((n) => pSelectedNeurons.findIndex((sn) => sn.title === n) > -1).length > 0
    ));
    setFilteredPromoters(fp);
  };

  useEffect(() => {
    if (promoters.length > 0) {
      setFilteredPromoters(promoters);
    }
  }, [promoters]);

  const handlePromoterOnChange = (event, values) => {
    setFilters(values, selectedNeurons, timePoint);
    handleMenuClose();
  };

  const handleNeuronOnChange = (event, values) => {
    setFilters(selectedPromoters, values, timePoint);
    handleMenuClose();
  };

  const handleDevStageMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const setTimePointAndStage = (value) => {
    setSelectedDevStage([value]);
    setFilters(selectedPromoters, selectedNeurons, value);
    handleMenuClose();
  };

  const menuId = 'development-stage-menu';
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
            <AutocompleteFilter
              id="Promoter"
              options={promoterOptions}
              placeholder="Type or search a promoter"
              onChange={handlePromoterOnChange}
              value={selectedPromoters}
            />
          </ListItem>
          <ListItem>
            <AutocompleteFilter
              id="Neurons"
              placeholder="Type or search a neuron"
              options={neuronOptions}
              onChange={handleNeuronOnChange}
              value={selectedNeurons}
            />
          </ListItem>
          <ListItem>
            <DevInputFilter
              handleDevStageMenuOpen={handleDevStageMenuOpen}
              selectedDevStage={selectedDevStage}
              menuId={menuId}
            />
            {renderMenu}
          </ListItem>
        </List>

      </Box>

      <Box className="main-content scrollbar">
        <Box className="wrapper">
          <Typography className="available-results">
            {`Available Results (${filteredPromoters.length})`}
          </Typography>

          <Box className="results-wrap scrollbar">
            {
              filteredPromoters
                .slice(0, pageNumber * recordsPerPage)
                .map((result, index) => <ResultCard key={`result_${index}`} result={result} />)
            }
          </Box>

          { pageNumber * recordsPerPage < filteredPromoters.length
            && (
              <Box className="button-group">
                <Button
                  color="primary"
                  disableElevation
                  variant="contained"
                  onClick={() => {
                    const p = pageNumber + (pageNumber * recordsPerPage < filteredPromoters.length
                      ? 1 : 0);
                    setPageNumber(p);
                  }}
                >
                  Load More
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    const p = Math.ceil(filteredPromoters.length / recordsPerPage);
                    setPageNumber(p);
                  }}
                >
                  Load All
                </Button>
              </Box>
            )}
        </Box>
      </Box>
    </Box>
  );
};

export default PromoterDB;

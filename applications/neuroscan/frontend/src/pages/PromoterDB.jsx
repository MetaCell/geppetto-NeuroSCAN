import React from 'react';
import {
  Typography,
  Box,
  Button,
  TextField,
  List,
  ListItem,
  makeStyles,
} from '@material-ui/core';
import Header from '../components/Header';
import { VIEWS } from '../utilities/constants';
import ResultCard from '../components/PromoterResultCard/ResultCard';
import SubHeader from '../components/SubHeader';
import TIMELINE from '../images/timeline.png';
import MODEL from '../images/modelnew.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      paddingTop: '40px',
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
    // paddingTop: '2.5rem',
    flexShrink: 0,
  },
  right: {
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      height: '100%',
    },
  },
}));

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
      src: '',
    },
  ],
  promoterVideos: [
    {
      label: 'Promoter',
      src: '',
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

          <List className="filters">
            <ListItem>
              <TextField fullWidth label="Promoter" variant="filled" />
            </ListItem>
            <ListItem>
              <TextField fullWidth label="Neuron" variant="filled" />
            </ListItem>
            <ListItem>
              <TextField fullWidth label="Developmental Stage" variant="filled" />
            </ListItem>
            <ListItem>
              <Button color="primary" disableElevation variant="contained">
                Search
              </Button>
            </ListItem>
          </List>

        </Box>
      </Box>

      <Box className="main-content scrollbar">
        <Box className="wrapper">
          <Typography className="available-results">
            Available Results (487)
          </Typography>

          <Box className="results-wrap scrollbar">
            {
              results.map((result, index) => <ResultCard key={`result_${index}`} result={result} />)
            }
          </Box>

          <Box className="button-group">
            <Button color="primary" disableElevation variant="contained">
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

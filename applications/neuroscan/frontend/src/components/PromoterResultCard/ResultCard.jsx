import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Grid,
} from '@material-ui/core';
import TICK from '../../images/tick.svg';
import ResultTabs from './ResultTabs';
import PromoterInformation from './PromoterInformation';

const ResultCard = ({
  result,
}) => (
  <Box className="results-box">
    <Box className="results-box_header">
      <Typography component="h3">
        {result?.title}
      </Typography>
      <Box className="wrap">
        <Box className="tags">
          {
            result?.cellLineage.map((cell, index) => <Chip key={`celllineage_${index}`} avatar={cell?.selected ? <img src={TICK} alt="tick" /> : null} label={cell?.label} className={cell?.selected ? 'active' : null} />)
          }
        </Box>
        <Typography>
          <img src={TICK} alt="tick" />
          Cells identified by lineaging
        </Typography>
      </Box>
    </Box>

    <ResultTabs options={result?.timeline} fullWidth />

    <Grid container spacing={1}>
      <Grid item xs={12} sm={4}>
        <ResultTabs options={result?.model} whiteBg />
      </Grid>
      <Grid item xs={12} sm={4}>
        <ResultTabs options={result?.expression} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <ResultTabs options={result?.promoterVideos} />
      </Grid>
    </Grid>

    <PromoterInformation info={result?.promoterInfo} />
  </Box>
);

export default ResultCard;

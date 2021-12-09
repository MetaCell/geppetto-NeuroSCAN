import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Grid,
} from '@material-ui/core';
import TICK from '../../images/tick.svg';
import ResultTabs from './ResultTabs';
import { backendURL, PROMOTER_MEDIA_TYPES } from '../../utilities/constants';
import PromoterInformation from './PromoterInformation';

const ResultCard = ({
  result,
}) => {
  const timeline = [{
    label: 'Timeline',
    src: `${backendURL}/files/promoterdb/promoters/${result.uid}/timeline.svg`,
  }];
  const model = [{
    label: 'Model',
    src: `${backendURL}/files/promoterdb/promoters/${result.uid}/model.svg`,
  }];
  const expression = [
    {
      label: '3D Expression',
      src: `${backendURL}/files/promoterdb/promoters/${result.uid}/3d_expression.mp4`,
      mediaType: PROMOTER_MEDIA_TYPES.video,
    },
  ];
  const promoterVideos = [
    {
      label: 'Promoter',
      src: `${backendURL}/files/promoterdb/promoters/${result.uid}/promoter.mp4`,
      mediaType: PROMOTER_MEDIA_TYPES.video,
    },
    {
      label: 'Histone Marker',
      src: `${backendURL}/files/promoterdb/promoters/${result.uid}/histone_marker.mp4`,
      mediaType: PROMOTER_MEDIA_TYPES.video,
    },
  ];
  const cellsByLineaging = result.cellsByLineaging.split(' ').filter((c) => c !== '');
  return (
    <Box className="results-box">
      <Box className="results-box_header">
        <Typography component="h3">
          {result.uid}
        </Typography>
        <Box className="wrap">
          <Box className="tags">
            {
              cellsByLineaging.map((cell, index) => <Chip key={`celllineage_${index}`} avatar={<img src={TICK} alt="tick" />} label={cell} className="active" />)
            }
          </Box>
          <Typography>
            <img src={TICK} alt="tick" />
            Cells identified by lineaging
          </Typography>
        </Box>
      </Box>

      <ResultTabs options={timeline} fullWidth />

      <Grid container spacing={1}>
        <Grid item xs={12} sm={4}>
          <ResultTabs options={model} whiteBg />
        </Grid>
        <Grid item xs={12} sm={4}>
          <ResultTabs options={expression} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <ResultTabs options={promoterVideos} />
        </Grid>
      </Grid>

      <PromoterInformation info1={result.information} info2={result.expressionPatterns} />
    </Box>
  );
};

export default ResultCard;

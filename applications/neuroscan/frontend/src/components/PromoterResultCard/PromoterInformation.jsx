import React from 'react';
import {
  Accordion,
  AccordionDetails,
  Grid,
  Typography,
  AccordionSummary,
} from '@material-ui/core';
import DOWN from '../../images/angle-down.svg';

const PromoterInformation = ({
  info1, info2,
}) => (
  <Accordion>
    <AccordionSummary
      expandIcon={<img src={DOWN} alt="DOWN" />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography>Promoter Information</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        <Grid
          container
          style={{
            color: 'white',
          }}
        >
          <Grid item xs={6} dangerouslySetInnerHTML={{ __html: info1.replaceAll('\n', '<br />') }} />
          <Grid item xs={6} dangerouslySetInnerHTML={{ __html: info2.replaceAll('\n', '<br />') }} />
        </Grid>
      </Typography>
    </AccordionDetails>
  </Accordion>
);

export default PromoterInformation;

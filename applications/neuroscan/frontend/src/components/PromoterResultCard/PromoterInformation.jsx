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
        <Grid container>
          <Grid item xs={6} dangerouslySetInnerHTML={{ __html: info1 }} />
          <Grid item xs={6} dangerouslySetInnerHTML={{ __html: info2 }} />
        </Grid>
      </Typography>
    </AccordionDetails>
  </Accordion>
);

export default PromoterInformation;

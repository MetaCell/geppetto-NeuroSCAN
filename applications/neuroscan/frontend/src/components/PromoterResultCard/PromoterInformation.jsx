import React from 'react';
import {
  Accordion,
  AccordionDetails,
  Typography,
  AccordionSummary,
} from '@material-ui/core';
import DOWN from '../../images/angle-down.svg';

const PromoterInformation = ({
  info,
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
        {info}
      </Typography>
    </AccordionDetails>
  </Accordion>
);

export default PromoterInformation;

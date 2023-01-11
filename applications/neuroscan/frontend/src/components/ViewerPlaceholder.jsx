import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const ViewerPlaceholder = () => (
  <Box className="MuiBox-empty" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
    <Typography variant="h2">
      Nothing to display yet.
    </Typography>
    <Typography variant="h2">
      You can search for neurons, contacts and synapses using the left sidebar.
    </Typography>
  </Box>
);

export default ViewerPlaceholder;

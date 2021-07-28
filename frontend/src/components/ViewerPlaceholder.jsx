import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const ViewerPlaceholder = () => (
  <Box className="MuiBox-empty" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
    <Typography variant="h2">
      No Elements Added yet.
    </Typography>
    <Typography variant="h2">
      You can add one with the Search Component.
    </Typography>
  </Box>
);

export default ViewerPlaceholder;

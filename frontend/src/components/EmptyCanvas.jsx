import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function EmptyCanvas() {
  return (
    <>
      <Box className="MuiBox-empty">
        <Typography variant="h2">
          No Elements Added yet.
        </Typography>
        <Typography variant="h2">
          You can add one with the Search Component.
        </Typography>
      </Box>
    </>
  );
}

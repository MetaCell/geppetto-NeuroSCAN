import React from 'react';
import { TreeItem } from '@material-ui/lab';
import { Typography, Box } from '@material-ui/core';
import DOWN from '../../images/chevron-down.svg';

const StyledTreeItem = (props) => {
  const {
    labelText,
    labelIcon: LabelIcon,
    labelInfo,
    ...other
  } = props;

  return (
    <TreeItem
      label={(
        <div className="labelRoot">
          <img src={DOWN} alt="down" />
          <Box className="labelIcon">
            <img src={LabelIcon} alt="" />
          </Box>
          <Typography variant="body2" className="labelText">
            {labelText}
          </Typography>
        </div>
      )}
      {...other}
    />
  );
};

export default StyledTreeItem;

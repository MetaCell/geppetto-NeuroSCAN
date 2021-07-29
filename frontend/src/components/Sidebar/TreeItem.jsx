import React from 'react';
import { TreeItem } from '@material-ui/lab';
import { Typography, Box } from '@material-ui/core';
import DOWN from '../../images/chevron-down.svg';

const StyledTreeItem = (props) => {
  const {
    labelText,
    labelIcon: LabelIcon,
    labelInfo,
    iconClass,
    ...other
  } = props;

  return (
    <TreeItem
      label={(
        <div className={`labelRoot ${iconClass}`}>
          <Box className="labelIcon" />
          <Typography variant="body2" className="labelText">
            {labelText}
          </Typography>
          {labelInfo > 0 ? (
            <Typography
              variant="caption"
              className="labelCaption"
              color="inherit"
            >
              {labelInfo}
              <img src={DOWN} alt="down" />
            </Typography>
          ) : null}
        </div>
      )}
      {...other}
    />
  );
};

export default StyledTreeItem;

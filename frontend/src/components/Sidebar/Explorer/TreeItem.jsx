import React from 'react';
import { TreeItem } from '@material-ui/lab';
import {
  Typography,
  Box,
  IconButton,
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DOWN from '../../../images/chevron-down.svg';
import ExplorerMenu from './ExplorerMenu';

const StyledTreeItem = (props) => {
  const {
    labelText,
    labelIcon: LabelIcon,
    labelInfo,
    ...other
  } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <TreeItem
        label={(
          <div className="labelRoot">
            { labelInfo > 0 && (
              <img src={DOWN} alt="down" />
            )}
            <Box className="labelIcon">
              <img src={LabelIcon} alt="" />
            </Box>
            <Typography variant="body2" className="labelText">
              {labelText}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
            >
              <MoreHorizIcon />
            </IconButton>
          </div>
        )}
        {...other}
      />
      <ExplorerMenu anchorEl={anchorEl} open={isMenuOpen} handleMenuClose={handleMenuClose} />
    </>
  );
};

export default StyledTreeItem;

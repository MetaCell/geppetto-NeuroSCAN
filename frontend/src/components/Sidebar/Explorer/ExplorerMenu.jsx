import React from 'react';
import {
  Menu,
  MenuItem,
  Divider,
} from '@material-ui/core';

const ExplorerMenu = ({
  anchorEl, handleMenuClose, open,
}) => {
  const menuId = 'primary-search-account-menu';
  return (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      onClose={handleMenuClose}
      getContentAnchorEl={null}
    >

      <MenuItem onClick={handleMenuClose}>Select</MenuItem>
      <Divider />
      <MenuItem onClick={handleMenuClose}>Hide</MenuItem>
      <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
    </Menu>
  );
};

export default ExplorerMenu;

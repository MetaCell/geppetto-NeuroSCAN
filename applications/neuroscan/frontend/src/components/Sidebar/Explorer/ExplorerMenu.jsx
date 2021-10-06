import React from 'react';
import {
  Divider,
  Popover,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';

const ExplorerMenu = ({
  anchorEl, handleMenuClose, open,
}) => {
  const menuId = 'explorer-menu-option';
  return (
    <Popover
      className="custom-popover dark right"
      id={menuId}
      open={open}
      anchorEl={anchorEl}
      onClose={handleMenuClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <List>
        <ListItem
          onClick={handleMenuClose}
          role="button"
          button
        >
          <ListItemText>
            <Typography>Select</Typography>
          </ListItemText>
        </ListItem>

        <Divider />

        <ListItem
          onClick={handleMenuClose}
          role="button"
          button
        >
          <ListItemText>
            <Typography>Hide</Typography>
          </ListItemText>
        </ListItem>

        <ListItem
          onClick={handleMenuClose}
          role="button"
          disableGutters
          button
        >
          <ListItemText>
            <Typography>Delete</Typography>
          </ListItemText>
        </ListItem>
      </List>
    </Popover>
  );
};

export default ExplorerMenu;

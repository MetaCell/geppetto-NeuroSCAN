import React from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography,
} from '@material-ui/core';
import MenuGroups from './MenuGroups';
import MENU from '../../../images/menu-chevron.svg';

const ExplorerMenu = ({
  anchorEl, handleMenuClose, open, ...other
}) => {
  const menuId = 'explorer-menu-option';
  return (
    <Popover
      className="custom-popover dark right no-pin"
      id={menuId}
      open={open}
      anchorEl={anchorEl}
      onClose={handleMenuClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
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
          role="button"
          button
        >
          <ListItemText>
            <Typography>
              Add to group
              <img src={MENU} alt="Menu" />
            </Typography>
          </ListItemText>
          <MenuGroups
            {...other}
          />
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

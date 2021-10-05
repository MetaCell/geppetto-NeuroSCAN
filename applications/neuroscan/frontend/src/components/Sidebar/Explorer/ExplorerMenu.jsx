import React from 'react';
import {
  Box,
  Menu,
  MenuItem,
  Divider,
  Typography,
  makeStyles,
} from '@material-ui/core';
import * as layoutActions from '@metacell/geppetto-meta-client/common/layout/actions';
import NestedMenuItem from 'material-ui-nested-menu-item';
import store from '../../../redux/store';
import { updateInstanceGroup } from '../../../services/instanceHelpers';
import vars from '../../../styles/constants';
import GROUP from '../../../images/group.svg';
import PLUS from '../../../images/plus.svg';

const {
  whiteTextColor,
  lightBlackColor,
} = vars;

const useStyles = makeStyles(() => ({
  MuiTypographyRoot: {
    fontSize: '0.75rem',
    fontWeight: '500',
    lineHeight: '1rem',
    letterSpacing: '0.005em',
    color: whiteTextColor,
    padding: '0.25rem 1rem',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'start',
    // padding: '0.5625rem 0.6875rem',
  },
  labelIcon: {
    margin: '.1rem .5rem 0 0',
    flexShrink: 0,
    '& img': {
      filter: 'invert(1)',
    },
  },
  labelText: {
    fontWeight: '500',
    flexGrow: 1,
    fontSize: '0.75rem',
    lineHeight: '1rem',
    color: lightBlackColor,
    letterSpacing: '0.005em',
  },
}));

const handleAddToGroup = (viewerId, instanceList, group = null) => {
  const state = store.getState();
  const { widgets } = state;
  if (viewerId) {
    // set selected state of instance(s)
    widgets[viewerId].config.instances = updateInstanceGroup(
      widgets[viewerId].config.instances,
      instanceList,
      group,
    );
    store.dispatch(layoutActions.updateWidget(widgets[viewerId]));
  }
};

const GroupsMenu = (props) => {
  const { viewerId, instance, groups } = props;
  const classes = useStyles();
  return groups && (
    <>
      <Typography key="add-to-group-text" className={classes.MuiTypographyRoot}>Existing groups</Typography>
      { groups.map((group) => (
        <MenuItem>
          <div className={classes.labelRoot}>
            <Box className={classes.labelIcon}>
              <img src={GROUP} alt="" />
            </Box>
            <Typography
              variant="body2"
              className={classes.labelText}
              onClick={() => handleAddToGroup(viewerId, [instance], group)}
            >
              {group}
            </Typography>
          </div>
        </MenuItem>
      ))}
      <Divider />
      <MenuItem>
        <div className={classes.labelRoot}>
          <Box className={classes.labelIcon}>
            <img src={PLUS} alt="" />
          </Box>
          <Typography
            variant="body2"
            className={classes.labelText}
            onClick={() => handleAddToGroup(viewerId, [instance], null)}
          >
            New group
          </Typography>
        </div>
      </MenuItem>
    </>
  );
};

const ExplorerMenu = ({
  anchorEl, handleMenuClose, open, ...other
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
      <NestedMenuItem
        label="Add to group"
        parentMenuOpen
      >
        <GroupsMenu
          {...other}
        />
      </NestedMenuItem>
      <Divider />
      <MenuItem onClick={handleMenuClose}>Hide</MenuItem>
      <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
    </Menu>
  );
};

export default ExplorerMenu;

import React from 'react';
import {
  Menu,
  MenuItem,
  makeStyles,
} from '@material-ui/core';
import PLUS from '../../images/plus_white.svg';

const useStyles = makeStyles(() => ({
  mr_8: {
    marginRight: '.5rem',
  },
}));

const MenuControl = ({
  anchorEl, handleClose,
}) => {
  const classes = useStyles();
  return (
    <Menu
      id="menuControl"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={handleClose}
      getContentAnchorEl={null}
    >
      <MenuItem onClick={handleClose}>
        <img src={PLUS} className={classes.mr_8} alt="PLUS" />
        Add to New Viewer
      </MenuItem>
    </Menu>
  );
};

export default MenuControl;

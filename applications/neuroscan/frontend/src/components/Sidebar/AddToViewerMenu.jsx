import React from 'react';
import {
  Typography,
  Menu,
  MenuItem,
  Divider,
  makeStyles,
} from '@material-ui/core';
import MENU_CHECKMARK_ON from '../../images/menu-checkmark-on.svg';
import PLUS from '../../images/plus_white.svg';

const useStyles = makeStyles(() => ({
  mr_8: {
    marginRight: '.5rem',
  },
}));

const AddToViewerMenu = ({
  anchorEl, handleClose, viewers, fullMenu = true,
}) => {
  const classes = useStyles();
  return (
    <Menu
      id="addToViewerMenu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={handleClose}
      getContentAnchorEl={null}
    >
      { fullMenu ? (
        [
          <Typography>Add to existing viewer</Typography>,
          viewers.map((viewer) => (
            <MenuItem key={viewer?.id} disabled={viewer?.disabled} onClick={handleClose}>
              <img src={MENU_CHECKMARK_ON} className={classes.mr_8} alt="MENU_CHECKMARK_ON" />
              {viewer?.title}
            </MenuItem>
          )),
          <Divider />,
        ]
      ) : null}
      <MenuItem onClick={handleClose}>
        <img src={PLUS} className={classes.mr_8} alt="PLUS" />
        Add to New Viewer
      </MenuItem>
    </Menu>
  );
};

export default AddToViewerMenu;

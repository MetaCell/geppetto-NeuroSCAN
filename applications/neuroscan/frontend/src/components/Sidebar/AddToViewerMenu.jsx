import React from 'react';
import { useSelector } from 'react-redux';
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
  anchorEl, handleClose, handleAddToViewer, fullMenu = true,
}) => {
  const classes = useStyles();
  const viewers = useSelector((state) => state.viewers);

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
          <Typography key="add-to-viewer-text">Add to existing viewer</Typography>,
          Object.entries(viewers).map(([id, viewer]) => (
            <MenuItem key={`add-to-viewer-${id}`} disabled={viewer?.disabled} onClick={() => handleAddToViewer(id)}>
              <img src={MENU_CHECKMARK_ON} className={classes.mr_8} alt="MENU_CHECKMARK_ON" />
              {id}
            </MenuItem>
          )),
          <Divider key="add-to-viewer-divider" />,
        ]
      ) : null}
      <MenuItem key="add-to-new-viewer" onClick={handleClose}>
        <img src={PLUS} className={classes.mr_8} alt="PLUS" />
        Add to New Viewer
      </MenuItem>
    </Menu>
  );
};

export default AddToViewerMenu;

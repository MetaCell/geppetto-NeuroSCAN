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
import PLUS from '../../images/plus-white.svg';
import { getViewersFromWidgets } from '../../utilities/functions';

const useStyles = makeStyles(() => ({
  mr_8: {
    marginRight: '.5rem',
  },
}));

const AddToViewerMenu = ({
  anchorEl, handleClose, handleAddToViewer, fullMenu = true,
}) => {
  const classes = useStyles();
  const widgets = useSelector((state) => state.widgets);
  const viewers = getViewersFromWidgets(widgets);

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
          viewers.map((viewer) => (
            <MenuItem key={`add-to-viewer-${viewer.id}`} disabled={viewer?.disabled} onClick={() => handleAddToViewer(viewer.id)}>
              <img src={MENU_CHECKMARK_ON} className={classes.mr_8} alt="MENU_CHECKMARK_ON" />
              {viewer.name}
            </MenuItem>
          )),
          <Divider key="add-to-viewer-divider" />,
        ]
      ) : null}
      <MenuItem key="add-to-new-viewer" onClick={() => handleAddToViewer()}>
        <img src={PLUS} className={classes.mr_8} alt="PLUS" />
        Add to New Viewer
      </MenuItem>
    </Menu>
  );
};

export default AddToViewerMenu;

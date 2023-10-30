import React from 'react';
import { TreeItem } from '@material-ui/lab';
import {
  Typography,
  Box,
  IconButton,
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import HTMLViewer from '@metacell/geppetto-meta-ui/html-viewer/HTMLViewer';
import DOWN from '../../../images/chevron-down.svg';
import ExplorerMenu from './ExplorerMenu';

const StyledTreeItem = (props) => {
  const {
    labelText,
    labelIcon: LabelIcon,
    labelInfo,
    viewerId,
    instance,
    onClick,
    hasExplorerMenu,
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
            <Typography variant="body2" className="labelText" onClick={onClick}>
              <HTMLViewer
                content={labelText}
                style={{
                  width: '100%', height: '100%', float: 'center',
                }}
              />
            </Typography>
            {
              hasExplorerMenu && (
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  aria-haspopup="true"
                  // handleMenuClose={handladdteMenuClose}
                  onClick={handleProfileMenuOpen}
                >
                  <MoreHorizIcon />
                </IconButton>
              )
            }
          </div>
        )}
        {...other}
      />
      {
        hasExplorerMenu && (
          <ExplorerMenu
            anchorEl={anchorEl}
            open={isMenuOpen}
            handleMenuClose={handleMenuClose}
            viewerId={viewerId}
            instance={instance}
            {...other}
          />
        )
      }
    </>
  );
};

export default StyledTreeItem;

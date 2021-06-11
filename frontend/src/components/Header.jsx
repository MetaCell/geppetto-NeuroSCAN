import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import PausePresentationIcon from '@material-ui/icons/PausePresentation';
import { Divider, Menu, MenuItem } from '@material-ui/core';
import CallMadeIcon from '@material-ui/icons/CallMade';
import MenuIcon from '../images/svg/icon-menu.svg';
import IconSync from '../images/svg/icon-synchronise.svg';
import IconRecord from '../images/svg/icon-record.svg';
import IconCopy from '../images/svg/icon-copy.svg';
import IconPause from '../images/svg/icon-pause.svg';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>About NeuroSCAN</MenuItem>
      <MenuItem onClick={handleMenuClose}>Tutorial</MenuItem>
      <Divider />
      <MenuItem onClick={handleMenuClose}>
        <Typography component="strong" variant="strong">
          Promoter DB
          <CallMadeIcon />
        </Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Box className="MuiBox-menu">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
            >
              <img src={MenuIcon} alt="Menu" />
            </IconButton>
            <Typography variant="h6">
              NeuroSCAN
            </Typography>
          </Box>
          <Box className="MuiBox-link">
            <Button startIcon={<img src={IconPause} alt="Pause" />}>
              Pause Animation
            </Button>
            <Button startIcon={<img src={IconSync} alt="Sync" />}>
              Synchronise
            </Button>
            <Button startIcon={<img src={IconRecord} alt="Record" />}>
              Record
            </Button>
          </Box>
          <Box className="MuiBox-button">
            <Button variant="outlined" endIcon={<img src={IconCopy} alt="Copy" />}>
              Copy link
            </Button>
            <Button color="primary" variant="contained">
              Share on Twitter
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </>
  );
};

export default Header;

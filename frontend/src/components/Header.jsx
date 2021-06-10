import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PausePresentationIcon from '@material-ui/icons/PausePresentation';
import IconSync from '../images/svg/icon-synchronise.svg';
import IconRecord from '../images/svg/icon-record.svg';
import IconCopy from '../images/svg/icon-copy.svg';

const Header = () => (
  <AppBar position="fixed" color="secondary">
    <Toolbar>
      <Box className="MuiBox-menu">
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">
          NeuroSCAN
        </Typography>
      </Box>
      <Box className="MuiBox-link">
        <Link href="/">
          <PausePresentationIcon />
          <Typography variant="button">Pause Animation</Typography>
        </Link>
        <Link href="/">
          <img src={IconSync} alt="Sync" />
          <Typography variant="button">Synchronise</Typography>
        </Link>
        <Link href="/">
          <img src={IconRecord} alt="Record" />
          <Typography variant="button">Record</Typography>
        </Link>
      </Box>
      <Box className="MuiBox-button">
        <Link href="/">
          <Typography variant="button">Copy link</Typography>
          <img src={IconCopy} alt="Copy" />
        </Link>
        <Button color="primary" variant="contained">
          Share on Twitter
        </Button>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Header;

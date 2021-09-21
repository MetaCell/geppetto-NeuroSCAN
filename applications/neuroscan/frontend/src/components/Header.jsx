import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import {
  Divider,
  makeStyles,
  Popover,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import CallMadeIcon from '@material-ui/icons/CallMade';
import MenuIcon from '../images/icon-menu.svg';
import Toggle from '../images/toggle.svg';
import ToggleIn from '../images/toggle-in.svg';
import { VIEWS } from '../utilities/constants';
import vars from '../styles/constants';
import AboutModal from './AboutModal';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      '& .MuiBox-menu': {
        '&.shrink': {
          transition: vars.transition,
          width: '2.5rem',
          padding: 0,
          '& .wrap': {
            display: 'none',
          },
        },
      },
    },
    [theme.breakpoints.down('xs')]: {
      position: 'fixed',
      '& .MuiToolbar-root': {
        flexDirection: 'column',
        '& .MuiBox-button': {
          width: '100%',
          justifyContent: 'center',
          padding: '.5rem 1rem',
          '& .MuiButton-outlined': {
            marginRight: '.5rem',
          },
          '& button': {
            flexGrow: 1,
          },
        },
        '& .MuiBox-menu': {
          width: '100%',
        },
      },
    },
  },
}));

const Header = (props) => {
  const { view, toggleSidebar, shrink } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAboutModal, setOpenAboutModal] = useState(false);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handeModalToggle = () => {
    setAnchorEl(null);
    setOpenAboutModal(true);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Popover
      className="dark"
      id={menuId}
      open={isMenuOpen}
      anchorEl={anchorEl}
      onClose={handleMenuClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <List disableGutters disablePadding>
        <ListItem
          role="button"
          button
          disableGutters
          onClick={handeModalToggle}
        >
          <ListItemText>
            <Typography>{`About ${view?.title}`}</Typography>
          </ListItemText>
        </ListItem>
        <ListItem
          role="button"
          disableGutters
          dense
          button
          onClick={handleMenuClose}
        >
          <ListItemText>
            <Typography>Tutorial</Typography>
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem
          button
          component="a"
          role="button"
          disableGutters
          dense
          onClick={handleMenuClose}
          to={view?.linkToRoute}
        >
          <ListItemText>
            <Link to={view?.linkToRoute}>
              <Typography component="strong">
                {view?.linkTo}
                <CallMadeIcon />
              </Typography>
            </Link>
          </ListItemText>
        </ListItem>
      </List>
    </Popover>
  );

  return (
    <>
      <AppBar className={classes.root} color="secondary">
        <Toolbar>
          <Box className={shrink ? 'MuiBox-menu shrink' : 'MuiBox-menu'}>
            <Box className="wrap">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                aria-describedby={menuId}
              >
                <img src={MenuIcon} alt="Menu" />
              </IconButton>
              <Typography variant="h6">
                {view?.title}
              </Typography>
            </Box>
            {view?.title === VIEWS?.neuroScan?.title ? (
              <IconButton className="ml-auto" color="inherit" onClick={toggleSidebar} disableFocusRipple disableRipple>
                <img src={shrink ? ToggleIn : Toggle} alt="Toggle" />
              </IconButton>
            ) : null}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <AboutModal
        open={openAboutModal}
        handleClose={() => setOpenAboutModal(false)}
        title={view?.title}
      />
    </>
  );
};

export default Header;

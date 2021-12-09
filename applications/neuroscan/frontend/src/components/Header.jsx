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
import introJs from 'intro.js';
import NeuroSCANLogo from '../images/neuroscanLogo.svg';
import MenuIcon from '../images/hamburger.svg';
import Toggle from '../images/toggle.svg';
import ToggleIn from '../images/toggle-in.svg';
import { VIEWS } from '../utilities/constants';
import vars from '../styles/constants';
import AboutModal from './AboutModal';
import 'intro.js/introjs.css';

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
  logoImg: {
    position: 'absolute',
    display: 'block',
    top: '0rem',
    left: '2rem',
    width: '15rem',
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

  const handleTutorial = () => {
    setAnchorEl(null);
    introJs().start();
    if (view?.title === 'NeuroSCAN') {
      introJs().setOptions({
        steps: [{
          element: window.document.querySelector('#search-bar'),
          title: 'Search in NeuroSCAN',
          intro: 'Search Search Search Search Search Search Search Search Search Search Search Search Search Search ',
          position: 'right',
        },
        {
          element: window.document.querySelector('#filter-icon'),
          title: 'How to filter data',
          intro: 'I am the filter, i filter because I like filtering, like coffe, dust, sound, anything.',
          position: 'right',
        },
        {
          element: window.document.querySelector('#Neurons-result'),
          title: 'Results',
          intro: 'Results results results results results results results results results results results results results results results',
          position: 'right',
        },
        {
          element: window.document.querySelector('#cphate-id'),
          title: 'CPHATE cluster viewer',
          intro: 'This is the CPHATE This is the CPHATE This is the CPHATE This is the CPHATE This is the CPHATE This is the CPHATE This is the CPHATE ',
          position: 'right',
        },
        {
          element: window.document.querySelector('.position-toolbar'),
          title: '3D viewer controls',
          intro: 'This are the controls, you can do stuff with them.',
          position: 'down',
        },
        {
          element: window.document.querySelector('#left-controls-id'),
          title: 'Left Controls',
          intro: 'Controls Controls Controls Controls Controls Controls Controls Controls Controls Controls Controls Controls Controls Controls ',
          position: 'right',
        },
        {
          element: window.document.querySelector('#right-controls-id'),
          title: 'Right Controls',
          intro: 'Controls Controls Controls Controls Controls Controls Controls Controls Controls Controls Controls Controls Controls Controls ',
          position: 'down',
        },
        {
          element: window.document.querySelector('.instances-box'),
          title: 'Navigator',
          intro: 'Navigator Navigator Navigator Navigator Navigator Navigator Navigator Navigator Navigator Navigator Navigator Navigator Navigator ',
          position: 'right',
        }].filter((step) => step.element !== null),
      }).start();
    } else {
      introJs().setOptions({
        steps: [{
          element: window.document.querySelector('.lineaged-cells'),
          title: 'Lineaged Cells',
          intro: 'Lineaged Cells Lineaged Cells Lineaged Cells Lineaged Cells Lineaged Cells Lineaged Cells Lineaged Cells Lineaged Cells Lineaged Cells ',
          position: 'left',
        },
        {
          element: window.document.querySelector('#timeline-image'),
          title: 'Timeline',
          intro: 'Timeline Timeline Timeline Timeline Timeline Timeline Timeline Timeline Timeline Timeline Timeline Timeline Timeline Timeline Timeline ',
          position: 'down',
        },
        {
          element: window.document.querySelector('#panel1a-header'),
          title: 'Promoter Information',
          intro: 'Promoter Information Promoter Information Promoter Information Promoter Information Promoter Information Promoter Information Promoter Information ',
          position: 'up',
        }].filter((step) => step.element !== null),
      }).start();
    }
  };

  const handeModalToggle = () => {
    setAnchorEl(null);
    setOpenAboutModal(true);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Popover
      className="custom-popover dark"
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
      <List>
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
          onClick={handleTutorial}
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
              <Typography style={{ color: vars.primaryColor }} variant="h6">
                { view?.title === VIEWS.neuroScan.title
                  ? (
                    <img
                      className={classes.logoImg}
                      src={NeuroSCANLogo}
                      alt={view?.title}
                    />
                  )
                  : view?.title}
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

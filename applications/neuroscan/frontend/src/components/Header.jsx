import React, { useEffect, useState } from 'react';
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
import IntroJs from 'intro.js';
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

  const handleViewTutorial = (showMessage) => {
    const intro = new IntroJs();
    if (view?.title === 'NeuroSCAN') {
      intro.setOptions({
        tooltipClass: 'customTooltip',
        dontShowAgain: showMessage,
        steps: [{
          element: window.document.querySelector('#search-bar'),
          title: 'Search bar',
          intro: `Type in one or more neuron names (AIB, AIBR, RIML) to filter results for 
          <b>Neurons, Contacts and Synapses</b>.`,
          position: 'right',
        },
        {
          element: window.document.querySelector('#filter-icon'),
          title: 'Synapse filter',
          intro: `Assign neurons typed in the search bar to <b>Pre</b> or <b>Post</b> synaptic 
          identities to filter the <b>Synapses</b> data.`,
          position: 'right',
        },
        {
          element: window.document.querySelector('#Neurons-result'),
          title: 'Neurons',
          intro: `Click on <b>Neurons</b>, <b>Contacts</b> or <b>Synapses</b> to expand and use the 
          <b>Add to</b> button next to the neuron/contact/synapse name to add it to a 3D viewer. 
          Refine your results by using the search bar.`,
          position: 'right',
        },
        {
          element: window.document.querySelector('#cphate-id'),
          title: 'CPHATE',
          intro: `Add contact profile plot (<b>CPHATE</b>) of the entire nerve ring for the 
          developmental time point selected above.`,
          position: 'right',
        },
        {
          element: window.document.querySelector('#left-controls-id'),
          title: 'Left toolbar',
          intro: `Tool usage from Left to Right:<br>
          Change <b>background</b> from dark to white.<br>
          Change <b>color</b> and <b>transparency</b> of Neurons, Contacts, Synapses, and CPHATE 
          clusters.<br>
          Change <b>developmental stage</b> of all the renderings in the viewer.<br>
          <b>Add</b> additional renderings to the viewer.<br>
          <b>Record</b> video of the current viewer and <b>download</b> video.<br>
          <b>Download</b> the viewer files for your own desktop viewing or download a <b>screenshot</b> 
          of the current viewer.`,
          position: 'down',
        },
        {
          element: window.document.querySelector('#right-controls-id'),
          title: 'Right toolbar',
          intro: `Tool usage from Left to Right:<br>
          <b>Play</b> a 360&#176; rotation of the viewer.<br>
          <b>Zoom</b> in and out of the viewer.<br>
          Use home button to <b>reset</b> the viewer to center.<br>`,
          position: 'down',
        },
        {
          element: window.document.querySelector('.explorer'),
          title: 'Navigation',
          intro: `<b>Play all</b> for 360&#176; rotation of all open windows.<br>
          Click <b>viewer name</b> to expand names for all <b>Neurons</b>, <b>Contacts</b> and <b>Synapses</b>
          in viewers. Hover over neuron names and click three dots on the right to open a menu to <b>Select</b>, 
          <b>Group</b>, <b>Hide</b> and <b>Delete</b> the neuron.`,
          position: 'right',
        }].filter((step) => step.element !== null),
      });
      intro.start();
    } else {
      intro.setOptions({
        tooltipClass: 'customTooltip',
        dontShowAgain: true,
        steps: [{
          element: window.document.querySelector('.lineaged-cells'),
          title: 'Lineaged cells',
          intro: `Neuron names with check marks have been identified by <b>lineage tracking</b>, 
          and all other neurons are suspected to have promoter expression. 
          `,
          position: 'left',
        },
        {
          element: window.document.querySelector('#timeline-image'),
          title: 'Timelapse',
          intro: 'View the <b>developmental time course</b> of the promoter expression.',
          position: 'down',
        },
        {
          element: window.document.querySelector('#panel1a-header'),
          title: 'Promoter information',
          intro: 'Find information about the <b>promoter</b> (primers, strains, and more) and <b>expression</b>.',
          position: 'up',
        }].filter((step) => step.element !== null),
      });
      intro.start();
    }
  };

  const handleTutorial = () => {
    setAnchorEl(null);
    handleViewTutorial(false);
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
            <a href={view?.linkToRoute}>
              <Typography component="strong">
                {view?.linkTo}
                <CallMadeIcon />
              </Typography>
            </a>
          </ListItemText>
        </ListItem>
      </List>
    </Popover>
  );

  useEffect(() => {
    handleViewTutorial(true);
  }, []);

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

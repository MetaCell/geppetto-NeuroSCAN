import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import {
  Divider,
  Menu,
  MenuItem,
  makeStyles,
} from '@material-ui/core';
import CallMadeIcon from '@material-ui/icons/CallMade';
import MenuIcon from '../images/svg/icon-menu.svg';
import IconCopy from '../images/svg/icon-copy.svg';
import Toggle from '../images/svg/toggle.svg';
import ToggleIn from '../images/svg/toggle-in.svg';
import IconSuggest from '../images/svg/icon-suggest.svg';
import VIEWS from '../constants';
import vars from '../styles/constants';

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
      getContentAnchorEl={null}
    >
      <MenuItem onClick={handleMenuClose}>{`About ${view?.title}`}</MenuItem>
      <MenuItem onClick={handleMenuClose}>Tutorial</MenuItem>
      <Divider />
      <MenuItem onClick={handleMenuClose}>
        <Link to={view?.linkToRoute}>
          <Typography component="strong">
            {view?.linkTo}
            <CallMadeIcon />
          </Typography>
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="fixed" className={classes.root} color="secondary">
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
              >
                <img src={MenuIcon} alt="Menu" />
              </IconButton>
              <Typography variant="h6">
                {view?.title}
              </Typography>
            </Box>
            <IconButton className="ml-auto" color="inherit" onClick={toggleSidebar} disableFocusRipple disableRipple>
              <img src={shrink ? ToggleIn : Toggle} alt="Toggle" />
            </IconButton>
          </Box>

          <Box className="MuiBox-button">
            { view?.title === VIEWS.promoterDB.title ? (
              <>
                <Button variant="outlined" startIcon={<img src={IconSuggest} alt="Suggest" />}>
                  Suggest a Promoter
                </Button>
                <Button color="primary" variant="contained">
                  Contact Us
                </Button>
              </>
            ) : (
              <>
                <Button variant="outlined" endIcon={<img src={IconCopy} alt="Copy" />}>
                  Copy Link
                </Button>
                <Button color="primary" variant="contained">
                  Share on Twitter
                </Button>
              </>
            )}
          </Box>

        </Toolbar>
      </AppBar>
      {renderMenu}
    </>
  );
};

export default Header;

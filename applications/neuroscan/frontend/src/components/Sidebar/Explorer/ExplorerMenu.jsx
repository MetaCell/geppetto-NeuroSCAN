import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Menu,
  MenuItem,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import NestedMenuItem from 'material-ui-nested-menu-item';
import store from '../../../redux/store';
import { addInstancesToGroup } from '../../../redux/actions/widget';
import vars from '../../../styles/constants';
import GROUP from '../../../images/group-white.svg';
import PLUS from '../../../images/plus-white.svg';

const {
  whiteTextColor,
  lightBlackColor,
} = vars;

const useStyles = makeStyles(() => ({
  MuiTypographyRoot: {
    fontSize: '0.75rem',
    fontWeight: '500',
    lineHeight: '1rem',
    letterSpacing: '0.005em',
    color: whiteTextColor,
    padding: '0.25rem 1rem',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'start',
  },
  labelIcon: {
    margin: '.1rem .5rem 0 0',
    flexShrink: 0,
  },
  labelText: {
    fontWeight: '500',
    flexGrow: 1,
    fontSize: '0.75rem',
    lineHeight: '1rem',
    color: lightBlackColor,
    letterSpacing: '0.005em',
  },
}));

const GroupsMenu = (props) => {
  const { viewerId, instance, groups } = props;
  const classes = useStyles();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [newGroupName, setNewGroupName] = React.useState();

  const handleNewGroupNameChange = (event) => {
    setNewGroupName(event.target.value);
  };

  const handleShowModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAddToGroup = (group = null) => {
    if (viewerId) {
      store.dispatch(addInstancesToGroup(viewerId, [instance], group));
      handleCloseModal();
    }
  };

  return groups && (
    <>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Box mb={1}>
            <Typography id="alert-dialog-title" variant="h6">New Group</Typography>
          </Box>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            variant="standard"
            value={newGroupName}
            onChange={handleNewGroupNameChange}
          />
        </DialogContent>
        <DialogActions>
          <>
            <Button onClick={handleCloseModal} className="secondary" variant="outlined">
              Cancel
            </Button>
            <div style={{ flex: '1 0 0' }} />
            <Button
              className="primary"
              variant="contained"
              onClick={() => handleAddToGroup(newGroupName)}
            >
              Create
            </Button>
          </>
        </DialogActions>
      </Dialog>
      <Typography key="add-to-group-text" className={classes.MuiTypographyRoot}>Existing groups</Typography>
      { groups.map((group) => (
        <MenuItem
          onClick={() => handleAddToGroup(group)}
        >
          <div className={classes.labelRoot}>
            <Box className={classes.labelIcon}>
              <img src={GROUP} alt="" />
            </Box>
            <Typography
              variant="body2"
              className={classes.labelText}
            >
              {group}
            </Typography>
          </div>
        </MenuItem>
      ))}
      <Divider />
      <MenuItem>
        <div className={classes.labelRoot}>
          <Box className={classes.labelIcon}>
            <img src={PLUS} alt="" />
          </Box>
          <Typography
            variant="body2"
            className={classes.labelText}
            onClick={handleShowModal}
          >
            New group
          </Typography>
        </div>
      </MenuItem>
    </>
  );
};

const ExplorerMenu = ({
  anchorEl, handleMenuClose, open, ...other
}) => {
  const menuId = 'primary-search-account-menu';
  return (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      onClose={handleMenuClose}
      getContentAnchorEl={null}
    >

      <MenuItem onClick={handleMenuClose}>Select</MenuItem>
      <Divider />
      <NestedMenuItem
        label="Add to group"
        parentMenuOpen
      >
        <GroupsMenu
          {...other}
        />
      </NestedMenuItem>
      <Divider />
      <MenuItem onClick={handleMenuClose}>Hide</MenuItem>
      <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
    </Menu>
  );
};

export default ExplorerMenu;

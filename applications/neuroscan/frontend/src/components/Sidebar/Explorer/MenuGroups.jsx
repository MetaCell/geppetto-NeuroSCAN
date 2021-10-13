import React from 'react';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
  makeStyles,
} from '@material-ui/core';
import NewGroupModal from '../../Modals/NewGroupModal';
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

const MenuGroup = (props) => {
  const { viewerId, instance, groups } = props;
  const classes = useStyles();
  const [modalOpen, setModalOpen] = React.useState(false);

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
      <NewGroupModal
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
        handleAddToGroup={handleAddToGroup}
      />
      <List
        subheader={(
          <ListSubheader component="div" id="nested-list-subheader" className={classes.MuiTypographyRoot}>
            Existing groups
          </ListSubheader>
        )}
      >
        { groups.map((group) => (
          <ListItem
            role="button"
            button
            onClick={() => handleAddToGroup(group)}
          >
            <ListItemText>
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
            </ListItemText>
          </ListItem>
        ))}

        <Divider />
        <ListItem
          role="button"
          button
          onClick={handleShowModal}
        >
          <ListItemText>
            <div className={classes.labelRoot}>
              <Box className={classes.labelIcon}>
                <img src={PLUS} alt="" />
              </Box>
              <Typography
                variant="body2"
                className={classes.labelText}
              >
                New group
              </Typography>
            </div>
          </ListItemText>
        </ListItem>
      </List>
    </>
  );
};

export default MenuGroup;

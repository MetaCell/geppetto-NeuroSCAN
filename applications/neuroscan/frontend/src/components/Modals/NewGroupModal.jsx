import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from '@material-ui/core';

const NewGroupModal = ({
  modalOpen, handleCloseModal, handleAddToGroup,
}) => {
  const [newGroupName, setNewGroupName] = React.useState();

  const handleNewGroupNameChange = (event) => {
    setNewGroupName(event.target.value);
  };

  return (
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
  );
};

export default NewGroupModal;

import React from 'react';
import {
  InputAdornment,
  IconButton,
  Chip,
} from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import DOWN from '../../images/expand_less.svg';

const DevInputFilter = (props) => {
  const { selectedDevStage, handleDevStageMenuOpen, menuId } = props;
  return (
    <ChipInput
      fullWidth
      InputLabelProps={{ shrink: true }}
      label="Developmental Stage"
      variant="filled"
      placeholder={selectedDevStage.length > 0 ? '' : 'Select a developmental stage'}
      value={selectedDevStage}
      InputProps={{
        endAdornment:
  <InputAdornment position="end" className="chipAdornment">
    <IconButton
      edge="start"
      color="inherit"
      aria-label="menu"
      aria-controls={menuId}
      aria-haspopup="true"
      onClick={handleDevStageMenuOpen}
      aria-describedby={menuId}
      className="development-icon"
    >
      <img src={DOWN} alt="DOWN" />
    </IconButton>
  </InputAdornment>,
      }}
      chipRenderer={(
        {
          value,
          className,
        },
        key,
      ) => (
        <Chip
          key={key}
          className={className}
          label={value}
          deleteIcon={false}
        />
      )}
    />
  );
};

export default DevInputFilter;

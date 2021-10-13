import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import {
  Checkbox,
  IconButton,
  TextField,
} from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import DOWN from '../../images/expand_less.svg';
import REMOVE from '../../images/remove-new.svg';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AutoCompleteFilter = (props) => {
  const { id, options, placeholder } = props;
  return (
    <Autocomplete
      fullWidth
      multiple
      id={id}
      closeIcon={false}
      options={options}
      disableCloseOnSelect
      ChipProps={{ deleteIcon: <IconButton><img src={REMOVE} alt="" /></IconButton>, onDelete: null }}
      popupIcon={<img src={DOWN} alt="DOWN" />}
      getOptionLabel={(option) => option.title}
      renderOption={(option, { selected }) => (
        <>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
            color="primary"
          />
          {option.title}
        </>
      )}
      renderInput={(params) => (
        <TextField {...params} InputLabelProps={{ shrink: true }} placeholder={placeholder} variant="filled" label={id} />
      )}
    />
  );
};

export default AutoCompleteFilter;

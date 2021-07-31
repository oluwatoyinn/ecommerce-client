/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const ComboBox = (props)=> {
  const { options,label, ...rest } = props;
  return (
    <Autocomplete
      id={label}
      options={options}
      getOptionLabel={(option) => option.title}
      style={{ width: 300 }}
      {...rest}
      renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
    />
  );
}

export default ComboBox
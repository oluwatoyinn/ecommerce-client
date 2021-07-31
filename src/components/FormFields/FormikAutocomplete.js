import React from 'react'
import { Autocomplete } from "@material-ui/lab";
import { fieldToTextField } from "formik-material-ui";
import { TextField } from "@material-ui/core";

export const FormikAutocomplete = ({ textFieldProps, ...props }) => {
    const { form: { setTouched, setFieldValue } } = props;
    const { error, helperText, ...field } = fieldToTextField(props);
    const { name } = field;
  
    return (
      <Autocomplete
        {...props}
        {...field}
        filterSelectedOptions
        onChange={ (_, value) => setFieldValue(name, value) }
        onBlur={ () => setTouched({ [name]: true }) }
        renderInput={ props => (
          <TextField
          {...props} 
          {...textFieldProps} 
          helperText={helperText} 
          error={error} 
          />
        )}
      />
    );
  }
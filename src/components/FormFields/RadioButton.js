import React from 'react'
import { at } from 'lodash';
import { useField } from 'formik';
import {
    Radio,
    RadioGroup,
    FormControl,
    FormLabel,
    FormControlLabel,
    FormHelperText
  } from '@material-ui/core';

const RadioButton = (props) => {
const { label,data,name,labelPlacement,disabled, ...rest } = props;
  const [field, meta, helper] = useField(props);
  const { setValue } = helper;
  const { value: selectedValue } = field;
  const [touched, error] = at(meta, 'touched', 'error');
  const isError = touched && error && true;
  
  const _renderHelperText =()=> {
    if (isError) {
      return <FormHelperText>{error}</FormHelperText>;
    }
  }

  const _onChange= (e) => {
      setValue(e.target.value)
  }

    return (
        <>
            <FormControl component="fieldset"  error={isError} >
                <FormLabel component="legend">{label}</FormLabel>
                <RadioGroup  aria-label={name} {...field} value={selectedValue ? selectedValue : ''} onChange={_onChange} {...rest} >
                    {data.map((item)=>(
                        <FormControlLabel 
                        key={item.id} 
                        value={item.id} 
                        control={<Radio color="primary" />} 
                        label={item.name} 
                        labelPlacement={labelPlacement || "end"}
                        disabled={disabled || false}
                        />
                    ))}
                    {_renderHelperText()}
                </RadioGroup>
            </FormControl>
        </>
    )
}

export default RadioButton

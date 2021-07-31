import React from 'react'
import { FormControl, Select, MenuItem,InputLabel, FormHelperText } from '@material-ui/core'

export default function CustomSelect(props) {
    
     // const classes =useStyles()
    const {name, label, value, onChange, error=null, options }=props

    return (
       <FormControl 
               
            {...(error && {error:true})}>
           <InputLabel >{label}</InputLabel>
           <Select
                label={label}
                value ={value}
                name={name}
                onChange={onChange}>
                    <MenuItem >None</MenuItem>
                    { 
                       options.map(
                            item =>(<MenuItem key={item.id}> {item.initial} </MenuItem>)
                            )
                    }
           </Select>
                {error && <FormHelperText>{error}</FormHelperText>}
       </FormControl>
    )
}


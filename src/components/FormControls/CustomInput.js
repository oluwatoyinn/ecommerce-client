import React, {Fragment} from 'react'
import {useField} from 'formik'
import {TextField} from '@material-ui/core'

export default function CustomInput (props){
    const {name, label, onChange, value,labelName,htmlFor, ...other} = props
    const [field] = useField(props)
    console.log("field=======>",field)
    return(
        <Fragment>
        <label style={{fontSize:20, fontWeight:600, marginLeft:'5px'}} htmlFor={htmlFor}> {labelName} </label>
        <TextField
        variant="outlined"
        label={label}
        value ={value}
        name={name}
        {...other}
        {...field}
        />
        </Fragment>
    )
}

export const CustomInput2 = ({label,...props})=>{
    const [field,meta] = useField(props)

    return (
        <Fragment>
                <input
                    {...field}
                    {...props}
                    className={'form-control' + (meta.error && meta.touched ? ' is-invalid' : '')}    
                >
                    {meta.error&&meta.error?(
                            <div className="invalid-feedback">
                                {meta.error}
                            </div> 
                        ) : null
                    }
                </input>
        </Fragment>
    )
}

export const CustomMuiInput = ({name,label,labelName, htmlFor, ...props})=>{
    const [field,meta] = useField(props)

    return (
        <Fragment>
            <div>
            <label style={{fontSize:20, fontWeight:600, marginLeft:'5px'}} htmlFor={htmlFor}> {labelName} </label>
             <input
                {...field}
                {...props}
                className={'form-control' + (meta.error && meta.touched ? ' is-invalid' : '')} 
            />
             {meta.error&&meta.error?(
                            <div className="invalid-feedback">
                                {meta.error}
                            </div> 
                        ) : null
                    }
        </div>
</Fragment>
    )
}

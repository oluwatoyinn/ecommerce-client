import React from 'react'
import { Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme=>({
    root:{
        margin:theme.spacing(1)
    },
    label:{
        textTransform:"none"
    }
}))

export default function CustomButton({text,size,color,variant,onClick,...props}) {

    const classes = useStyles()
    // const {text, size, color, variant, onClick, ...props} =props 

    return (
       <Button
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            {...props}
            classes={{root:classes.root, label:classes.label}}
        >{text}</Button>
    )
}

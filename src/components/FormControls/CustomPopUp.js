import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core'
import Controls from "../FormControls/controls";
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme=>({
    dialogWrapper:{
        '& .MuiDialog-paper':{
            padding:theme.spacing(2),
            position:'absolute',
            top:theme.spacing(2),
            // width:'100%'
        }
    },
    dialogTitle:{
        paddingRight:'0px'
    },
    secondary:{
        backgroundColor:theme.palette.secondary.light,
        '& .MuiButton-label':{
            color:theme.palette.secondary.main
        }
    },
    title: {
      fontSize: 27,
      padding:'15px',
      fontWeight:600,
      textAlign:'center'
    },
  //    
}))

export default function CustomPopUp(props) {
    const classes = useStyles()
    const {title,subTitle, children, openPopup, openLog, setOpenPopup} = props

    return (
       <Dialog open={openPopup || openLog} maxWidth="md" className={classes.dialogWrapper}>
           <DialogTitle className={classes.dialogTitle}>
               <div style={{display:"flex"}}>
                    <Typography className={classes.title} variant="h6" component="div" style={{flexGrow:1}}>
                        {title} 
                    </Typography>
                   
                    <Controls.ActionButton 
                       className={classes.secondary}
                        onClick={() =>{setOpenPopup (false)}}
                    >
                        <CloseIcon />
                    </Controls.ActionButton> <br/> 
               </div>
               <h6 style={{textAlign:'center', paddingTop:'0px'}}> {subTitle} </h6>
           </DialogTitle>
           <DialogContent dividers>
                {children} 
           </DialogContent>
       </Dialog>
    )
}

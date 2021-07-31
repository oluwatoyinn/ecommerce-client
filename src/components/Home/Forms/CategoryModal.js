import React,{useState} from 'react'
import {FieldArray, Form,Field, Formik } from 'formik'
import { Card, 
    CardContent,
    Typography,
    Button, 
    makeStyles, 
    TableBody, 
    TableRow, 
    TableCell,Modal,Backdrop,Grid, FormControl, RadioGroup,Radio, FormControlLabel, FormLabel, CircularProgress, Container } from '@material-ui/core'
import {CategorySchema} from '../../../utils/ValidationSchema'
import CustomMuiInput from '../../FormControls/CustomInput'
import Controls from "../../FormControls/controls";
import CustomInput from "../../FormControls/CustomInput";

const CategoryModal=(props) =>{

    // const initialState={
    //     productName:'',
    //     productImageUrl:'',
    //     productDescription:'',
    //     category:'',
    //     price:0,
    //     quantity:0,
    //     tags:false,
    //     socialMedia:[]
    // }
    
    const [isEdit, setIsEdit] = useState(false)
    // const [value, setValue] =useState(initialState)

    return (
        <React.Fragment>
            <Formik 
            enableReinitialize 
            initialValues={{
                name:'',
                description:'',
                }} 
                onSubmit={async(values)=>{
                  console.log('values submitted', values);
                }}
                    validationSchema={CategorySchema}
                >
                          {({values, errors,isSubmitting})=>
                            (
                                <Controls.CustomForm >
                                <Grid  container spacing={3}>
                                    <Grid item xs={12} style={{marginRight:"10px"}}>
                                        <CustomMuiInput 
                                                name="name"
                                                label="Category Name"  
                                            />
                                        <CustomMuiInput 
                                            name="description"
                                            label="Description"  
                                            multiline
                                            rows={5} 
                                        />
                                    </Grid>
                                    {isEdit?
                                            <Grid item xs={12}>
                                                <Controls.CustomButton 
                                                    type="submit"
                                                    text="Update Category"
                                                    variant="contained"
                                                    style={{width:'100%', fontSize:'16px'}}
                                                /> 
                                            </Grid>
                                        :
                                            <Grid item xs={12}>
                                                <Controls.CustomButton 
                                                    type="submit"
                                                    text="Create Category"
                                                    variant="contained"
                                                    style={{width:'100%', fontSize:'16px'}}
                                                /> 
                                            </Grid>
                                    }
                                </Grid>
                           </Controls.CustomForm> 
                          )}
                          
                        </Formik>
        </React.Fragment>
    )
}


export default CategoryModal
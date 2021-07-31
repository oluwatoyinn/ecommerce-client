import React,{useState,memo} from 'react'
import {FieldArray, Form,Field, Formik, withFormik } from 'formik'
import { Card, 
    CardContent,
    Typography,
    Button, 
    makeStyles, 
    TableBody, 
    TableRow, 
    TableCell,Modal,Backdrop,Grid, FormControl, RadioGroup,Radio, FormControlLabel, FormLabel, CircularProgress, Container } from '@material-ui/core'
import CustomInput from '../components/FormControls/CustomInput'
import Controls from '../components/FormControls/controls'
import {ProductModalSchema} from '../utils/ValidationSchema'
import CloseIcon from '@material-ui/icons/Close';
import CustomMuiInput from '../components/FormControls/CustomInput'



const Productmodalform=(props) =>{

    const initialState={
        name:'',
        imageUrl:'',
        description:'',
        categories:'',
        price:0,
        quantity:0,
        tags:false,
        socialMedia:[]
    }
    
    const [isEdit, setIsEdit] = useState(false)
    const [value, setValue] =useState(initialState)

    return (
        <React.Fragment>
            <Formik 
            initialValues={{
                          name:'',
                          imageUrl:'',
                          description:'',
                          categories:'',
                          price:0,
                          quantity:0,
                          tags:false,
                          socialMedias:[{name:'', URL:''}] 
                        }} 
                        validationSchema={ProductModalSchema}
                        onSubmit={async(values)=>{
                          console.log('values subitted', values);
                        }}>
                          {({values, errors, isSubmitting})=>
                            <Controls.CustomForm>
                              <Grid container spacing={3} style={{marginRight:"20px"}}>
                                  <Grid item xs={12}>
                                      <CustomMuiInput
                                              name="name"
                                              label="Name"
                                          />
                                          <CustomInput
                                              name="imageUrl"
                                              label="Image Url"   
                                          />
                                  </Grid>
                                  <Grid item xs={12}>
                                      <CustomInput 
                                              name="description"
                                              label="Description" 
                                              multiline
                                              rows={4} 
                                          />
                                  </Grid>
                                  <Grid item xs={12}>
                                      <CustomInput 
                                              name="categories"
                                              label="Categories"  
                                          />
                                  </Grid>
                                  <Grid item xs={4}>
                                      <CustomInput 
                                              name="price"
                                              label="Price"  
                                          />
                                  </Grid>
                                  <Grid item xs={4}>
                                      <CustomInput 
                                              name="quantity"
                                              label="Quantity"  
                                          />
                                  </Grid>
                                  <Grid item xs={4} >
                                      <FormControl >
                                      <FormLabel>Tags</FormLabel>
                                          <RadioGroup row 
                                          name="tags"
                                          >
                                          <FormControlLabel value="best-seller" control={<Radio/>} label="Best Seller"/>
                                          <FormControlLabel value="hot-sales" control={<Radio/>} label="Hot Sales"/>
                                          </RadioGroup>
                                      </FormControl>
                                  </Grid>

                                        <FieldArray>
                                            {({push, remove})=>(
                                                <React.Fragment>
                                                     <Grid item>
                                                        <Typography variant="h6">Social Media</Typography>
                                                     </Grid>
                                                     {values.socialMedias.map((_, index)=>(
                                                         <Container maxWidth="md">
                                                         <Card>
                                                             <CardContent>
                                                                 <Grid container spacing={3}>
                                                                     <Grid item xs={6} >
                                                                        <CustomInput name={`socialMedias.${index}.name`} label="Social Media Type" />
                                                                    </Grid>
                                                                    <Grid item xs={5}>
                                                                        <CustomInput name={`socialMedias[${index}].URL`} label="Social Media URL"/>
                                                                    </Grid>
                                                                    <Grid  item xs={1}>
                                                                        <button style={{backgroundColor:'red', color:'#fff'}} onClick={()=>remove(index)}>x</button>
                                                                    </Grid>
                                                                 </Grid>
                                                             </CardContent>
                                                         </Card></Container>
                                                     ))}
                                                </React.Fragment>
                                            )}
                                        </FieldArray>
                                    
                                   
                                  {isEdit?
                                  <Grid item xs={12}>
                                    <Controls.CustomButton 
                                          // text="Update Product"
                                          disabled={isSubmitting}
                                          variant="contained"
                                          style={{width:'100%', fontSize:'16px'}} 
                                          starIcon={isSubmitting ? <CircularProgress size='1rem' /> :undefined}
                                    >{isSubmitting ? 'Submitting' : 'Update Product'}</Controls.CustomButton> 
                                    </Grid>
                                  :
                                    <Grid item xs={12}>
                                      <Controls.CustomButton  
                                          text="Create Product"
                                          variant="contained"
                                          disabled={isSubmitting}
                                          style={{width:'100%', fontSize:'16px'}}
                                          starIcon={isSubmitting ? <CircularProgress size='1rem' /> :undefined}
                                      >{isSubmitting ? 'Submitting' : 'Create Product'}</Controls.CustomButton> 
                                    </Grid>
                                  }
                              </Grid>
                              {/* <pre>{JSON.stringify({values, errors}, null, 4)}</pre> */}
                          </Controls.CustomForm> 
                          }
                          
                        </Formik>
        </React.Fragment>
    )
}


export default Productmodalform
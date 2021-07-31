import React,{useState} from 'react'
import {FieldArray, Formik } from 'formik'
import { Card, 
    CardContent,
    Typography,
    Grid, FormControl, RadioGroup,Radio, FormControlLabel, FormLabel, Container } from '@material-ui/core'
import {ProductModalSchema} from '../../../utils/ValidationSchema'
import CustomMuiInput from '../../FormControls/CustomInput'
import Controls from "../../FormControls/controls";
import CustomInput from "../../FormControls/CustomInput";

const ProductModal=(props) =>{

    const initialState={
        productName:'',
        productImageUrl:'',
        productDescription:'',
        category:'',
        price:0,
        quantity:0,
        tags:false,
        socialMedia:[]
    }
    
    const [isEdit] = useState(false)
    const [value] =useState(initialState)

    return (
        <React.Fragment>
            <Formik 
            enableReinitialize 
            initialValues={{
                productName:value.productName,
                productImageUrl:'',
                productDescription:'',
                category:'',
                price:0,
                quantity:0,
                tags:false,
                socialMedias:[{name:'', URL:''}] 
                }} 
                // onSubmit={async(values)=>{
                //   console.log('values submitted', values);
                // }}
                    validationSchema={ProductModalSchema}
                >
                          {({values, errors,isSubmitting})=>
                            (<Controls.CustomForm>
                              <Grid container spacing={3} >
                                  <Grid item xs={12}>
                                      <CustomMuiInput
                                              name="productName"
                                              label="Name"
                                              type="text"
                                          />
                                        <CustomMuiInput
                                            name="productImageUrl"
                                            label="Image Url"   
                                        />
                                  </Grid>
                                  <Grid item xs={12}>
                                      <CustomInput 
                                              name="productDescription"
                                              label="Description" 
                                              multiline
                                              rows={4} 
                                          />
                                  </Grid>
                                  <Grid item xs={12}>
                                      <CustomInput 
                                              name="category"
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
                                          <FormControlLabel value="best-seller" control={<Radio/>} label="Best Sell"/>
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
                                          type="submit"
                                          style={{width:'100%', fontSize:'16px'}} 
                                        //   starIcon={isSubmitting ? <CircularProgress size='1rem' /> :undefined}
                                    >{isSubmitting ? 'Submitting' : 'Update Product'}</Controls.CustomButton> 
                                    </Grid>
                                  :
                                    <Grid item xs={12}>
                                      <Controls.CustomButton  
                                          text="Create Product"
                                          variant="contained"
                                          type="submit"
                                          disabled={isSubmitting}
                                          style={{width:'100%', fontSize:'16px'}}
                                        //   starIcon={isSubmitting ? <CircularProgress size='1rem' /> :undefined}
                                      >{isSubmitting ? 'Submitting' : 'Create Product'}</Controls.CustomButton> 
                                    </Grid>
                                  }
                              </Grid>
                              <pre>{JSON.stringify({values, errors}, null, 4)}</pre>
                          </Controls.CustomForm> 
                          )}
                          
                        </Formik>
        </React.Fragment>
    )
}


export default ProductModal
import React from 'react'
// import CustomPopUp from "../components/FormControls/CustomPopUp";
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CustomForm from "../components/FormControls/CustomForm";
import { makeStyles, Grid, Typography, FormControl, RadioGroup,Radio, FormControlLabel, FormLabel, Button,CircularProgress} from '@material-ui/core/';
import { FieldArray, Formik} from "formik";
import { RegisterSchema } from "../utils/ValidationSchema";
import InputField from "../components/FormFields/InputField";
import { register } from "../actions/authenticationAction";
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
// import {setAlert} from '../actions/alert';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    title: {
      fontSize: 27,
      padding:'15px',
      fontWeight:600,
      textAlign:'center'
    },
    button: {
      margin: theme.spacing(1),
      float:'right'
    },
    topRight:{
      position: 'absolute',
      top: '0px',
      right: '0px',
      // fontSize: '18px'
    },
    bottomRight:{
      position: 'absolute',
      bottom: '14px',
      right:'13px',
      fontSize: '18px'
    },
  }));

const Register=({register}) =>{
  const history = useHistory();

  const classes= useStyles()

    return (
        <React.Fragment>
           <Container maxWidth="md" className={classes.root}>
                <Formik 
                  initialValues={{
                  name:'',
                  email:"",
                  username:'',
                  gender:"male",
                  password:'',
                  contactInfos:[{phoneNumber:'', address:''}]
                  }}
                  onSubmit={async(data, {setSubmitting})=>{
                    setSubmitting(true);
                    await register(data, history)
                    setSubmitting(false)
                  }}
                  validationSchema={RegisterSchema}
                >
                  {({values,isSubmitting})=>(
                    <CustomForm>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <InputField 
                            labelName="First Name"
                            name="name"
                          />
                          <InputField 
                            name="email"
                            labelName="Email Address" 
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <InputField 
                            name="username"
                            labelName="User Name" 
                          />
                        </Grid>
                        <Grid item xs={6} >
                          <FormControl>
                            <FormLabel style={{fontSize:20, fontWeight:600, marginLeft:'5px'}}>Gender</FormLabel>
                              <RadioGroup row 
                                name="gender"
                              >
                              <FormControlLabel value="male" control={<Radio/>} label="Male"/>
                              <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                              </RadioGroup>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <InputField 
                            name="password"
                            labelName="Password"
                            type="password"  
                          />
                        </Grid>

                        <FieldArray name="contactInfos">
                          {({push, remove})=>(
                            <React.Fragment>
                              <Grid item>
                                  <Typography variant="h6">Contact Info</Typography>
                              </Grid>
                                {values.contactInfos.map((_, index)=>(
                                  <Container key={index}>
                                    <Card>
                                      <CardContent>
                                        <Grid container spacing={2} style={{position:"relative"}}>
                                          <Grid item xs={6} >
                                            <InputField
                                            fullWidth 
                                            name={`contactInfos.${index}.phoneNumber`} 
                                            label="Phone Number" 
                                            />
                                          </Grid>
                                          <Grid item xs={6} >
                                            <InputField 
                                            fullWidth
                                            name={`contactInfos.${index}.address`} 
                                            label="Address"
                                            />
                                          </Grid>
                                         {values.contactInfos.length>1 &&
                                          <Grid item >
                                            <button  style={{backgroundColor:'red', color:'#fff'}} className={classes.topRight} onClick={()=>remove(index)}>x</button>
                                          </Grid>
                                          }
                                        </Grid>
                                         
                                      </CardContent>
                                    </Card>
                                  </Container>
                                ))}
                              <Grid item xs={12} >
                                <button type="submit" style={{backgroundColor:'#2886C8', color:'#fff',float:"right"}}
                                  // className={classes.bottomRight} 
                                  onClick={()=>push({
                                    phoneNumber:'', 
                                    address:''
                                  })}
                                >
                                    ADD+
                                </button>
                              </Grid>
                            </React.Fragment>
                          )}        
                        </FieldArray>
                        <Grid item xs={12}>
                          <Button 
                            fullWidth
                            startIcon={isSubmitting ? <CircularProgress size="1rem"/> :null }
                            type="submit" 
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            style={{backgroundColor:"#2886C8"}}
                          >
                            Create Account
                          </Button>
                        </Grid>
                      </Grid>
                      {/* <Container>
                        <pre>{JSON.stringify(values,null,2)}</pre>
                        <pre>{JSON.stringify(errors,null,2)}</pre>
                      </Container> */}
                    </CustomForm> 
                  )}
                </Formik>
            </Container>
        </React.Fragment>
    )
}

Register.propTypes ={
  register:PropTypes.func.isRequired
}

export default connect(null,{register})( Register)

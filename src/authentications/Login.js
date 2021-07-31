import React from 'react'
import Container from '@material-ui/core/Container';
import CustomForm from "../components/FormControls/CustomForm";
import { makeStyles, Grid,Button,} from '@material-ui/core/';
import { LoginSchema } from "../utils/ValidationSchema";
import {Formik} from 'formik'
import CircularProgress from '@material-ui/core/CircularProgress'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { login } from "../actions/authenticationAction";
import { Redirect } from "react-router-dom"
import InputField from "../components/FormFields/InputField";
import { Link } from "react-router-dom";

// import {LoginSchema} from "../utils/ValidationSchema";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width:'100%',
      '& input.MuiInputBase-input.MuiOutlinedInput-input':{
        fontSize:20
      }
    },
    paper: {
      padding: theme.spacing(2),
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
  }));

const Login =({isAuthenticated, login}) =>{
  const classes= useStyles()
  // const [setLoading] = useState(false)

  if(isAuthenticated) return <Redirect to="/home" /> 
  
    return (
        <React.Fragment>
            <Container>
              <Formik 
                initialValues={{
                  email:'',
                  password:''
                }} 
                onSubmit={async(data,{setSubmitting})=>{
                  setSubmitting(true);
                  await login(data)
                  setSubmitting(false);
                }} 
                validationSchema={LoginSchema}
              >
                {({isSubmitting})=>(
                  <CustomForm>
                    <Grid container spacing={3} className={classes.root}>
                          <Grid item xs={12} >
                            <InputField
                            fullWidth
                            name="email"
                            labelName="Email Address"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <InputField
                            fullWidth
                            name="password"
                            labelName="Password" 
                            type="password"
                            />
                          </Grid>
                          <Grid item xs={12}>
                           {/* {isSubmitting ? <CircularProgress size="2rem" style={{marginLeft:"300px"}}/> : */}
                            <Button 
                            fullWidth
                            startIcon={isSubmitting ? <CircularProgress size="1rem"/> : null}
                            type="submit" 
                            variant="contained" 
                            color="primary"
                            disabled={isSubmitting}   
                            style={{backgroundColor:"#2886C8"}}
                            >
                            Login
                            </Button>
                          </Grid>
                    </Grid>
                    <div style={{textAlign:'center'}}>Dont have an account? <Link to="/register">Sign Up</Link> </div>
                    {/* <pre>{JSON.stringify({values, errors}, null, 4)}</pre> */}
                  </CustomForm>
                    )}
                  </Formik> 
                </Container>
        </React.Fragment>
    )
}

Login.propTypes = {
  isAuthenticated:PropTypes.bool.isRequired,
  isLoading:PropTypes.bool.isRequired
}

const mapStateToProps = state =>({
  isAuthenticated:state.authenticationReducer.isAuthenticated,
  isLoading:state.authenticationReducer.isLoading
}) 

export default connect(mapStateToProps,{login})(Login)

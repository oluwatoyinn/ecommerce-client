import React, {useState} from 'react'

import { Card, 
    CardContent,
    Typography,
    Button, 
    makeStyles, 
    AppBar, Toolbar, Avatar, Grid, Radio, RadioGroup, Container, FormControlLabel, FormLabel,Checkbox, MenuItem } from '@material-ui/core'
import { Link, useHistory } from "react-router-dom";
import { getAllProduct, getProduct, postProduct,deleteProduct, updateProduct } from "../../actions/productActions";
import { getCategory } from "../../actions/categoryActions";
import {Modal,ModalHeader,ModalBody, ModalFooter } from 'reactstrap';
import { FieldArray, Formik, Field} from "formik";
import Controls from "../FormControls/controls";
import { ProductModalSchema } from "../../utils/ValidationSchema";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import { logout } from "../../actions/authenticationAction";
import InputField from "../FormFields/InputField";
import * as categoryType from '../../utils/SelectOptio'
import FormFields from '../../components/FormFields'
// import ProductModal from "../Home/Forms/ProductModal";
// import CustomSelect  from "../FormControls/CustomSelect";
import { FormikAutocomplete } from "../FormFields/FormikAutocomplete";
import { useEffect } from 'react';
import  {createProduct}  from "../../services/productService";
import { Persist } from "formik-persist";
import ProductTable from './ProductTable';

    const useStyles = makeStyles((theme) => ({
        root: {
          backgroundColor:'#fff',
          transform:'translateZ(0)',
          color:'#00CCFF',
            '& > *': {
                margin: theme.spacing(1),
              },
            '& button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary':{
                marginRight:'20px'
            }
        },
            avatarColor:{
              backgroundColor:'#00CCFF'
            },
            categoryButton:{
              color:'#00CCFF',
              fontSize:20,
              textDecoration:"none"
            },
          tableRightBorder: {
            borderWidth: 2,
            borderRightWidth: 1,
            borderBlock:3,
            borderColor: 'grey',
            borderStyle: 'solid',
            // border:"2px 3px"
        },
        modal: {
            // display: 'flex',
            // alignItems: 'center',
            justifyContent: 'center',
            paddingTop:'60px',
            // width:'100%',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        title:{
            // textAlign:'center',
            fontSize:27,
            fontWeight:600,
        },
        btnDelete:{
            backgroundColor:'red',
            color:"#fff",
        },
        btnEdit:{
            backgroundColor:'#00CCFF',
            color:'#fff',
            marginRight:'9px'
        }, 
        modalTitle:{
            fontSize:20,
            textAlign:'center'
        },
        topRight:{
          position: 'absolute',
          top: '0px',
          right: '0px',
          // fontSize: '18px'
        },
      }));
    

const Products=({getProduct,getCategory,getAllProduct,logout,allProduct,categories,products,product, props})=> {
    const classes = useStyles()
    const [isEdit, setIsEdit] = useState(false)
    const [error, setError] = useState({})
    const [modal, setModal] = useState(false)

    useEffect(()=>{
      const sendRequest = async ()=>{
        await getCategory()
        await getAllProduct()
        await getProduct() 
      }
      sendRequest()
    }, [getCategory,getProduct,getAllProduct])


    const toggle=()=>{
        setModal(!modal)
    }

    const updateToggle=()=>{
        setIsEdit(true)
        toggle()
    }

    let categoryIds = [];
    categories!==null&&categories!==undefined&&categories.length>0&&
    categories.forEach(item=>{
      categoryIds.push({
        label:item.name,
        value:item._id
      })
    })

    console.log(categoryIds)

    const closeBtn = <button className="close" onClick={toggle}>&times;</button>
  
    return (
        <React.Fragment>
             <AppBar position="static" className={classes.root} >
                <Toolbar >
                  <Link to="/home" style={{textDecoration:"none", color:'#00CCFF'}}>
                    <Typography variant="h6" className={classes.title}>
                        eTranzact
                    </Typography>
                  </Link>
                  <div style={{ paddingLeft:"1700px"}} >
                    <Link to="/product" style={{textDecoration:"none"}} > <Button className={classes.categoryButton} >PRODUCT</Button>  </Link>
                    <Link to="category" style={{textDecoration:"none", paddingRight:"70px"}}> <Button className={classes.categoryButton}   >CATEGORY</Button> </Link>
                  </div>
                {/* <div style={{paddingLeft:"950px"}}> */}
                   <Avatar className={classes.avatarColor} />
                   <Link to="/" onClick={()=>logout()} style={{paddingRight:'30px'}} >
                       <ExitToAppIcon  fontSize="large" style={{margin:"20px", }} />
                    </Link>
                {/* </div> */}
                </Toolbar>
            </AppBar>
            <div className="container-fluid p-5">
              <div className="p-5">
                <div className="row">
                  <div className="col-md-6">
                      <h5 className="text-left" className={classes.title}>Manage Products</h5>
                  </div>
                  <div className="col-md-1"> 
                    <span style={{fontSize:20, fontWeight:'bold'}}>Sort<ExpandMoreIcon /> </span> 
                  </div>
                  <div className="col-md-1"> 
                    <span style={{fontSize:20, fontWeight:'bold'}}>Date<ExpandMoreIcon /> </span> 
                  </div>
                  <div className="col-md-4">
                    <button className="btn btn-outline-primary float-right" style={{backgroundColor:'#00CCFF', color:'#fff', fontWeight:600}} onClick={toggle}  >
                        <i className="fa fa-plus"></i> Add New Product
                    </button>
                  </div>  
                </div> <hr color="#00CCFF" />
              </div>
              {/* Pagination and Search Button start here */}
              <div className="card">
                <div className="card-body pt-1">                  
                  <ProductTable 
                  product={product} 
                  updateToggle={updateToggle} 
                  />
                </div>
              </div>
              {/* Pagination and Search button ends here */} 
            </div>
            {/* Modal start here */}

            <Modal 
            isOpen={modal} 
            toggle={toggle} 
            size="lg"
            backdrop="static"
            >
              <ModalHeader toggle={toggle} close={closeBtn} className={classes.modalTitle} >Create New Products</ModalHeader>
                <ModalBody>
                  <Formik 
                    enableReinitialize 
                    initialValues={{
                      productName:'',
                      productImageUrl:'',
                      productDescription:'',
                      category:[],
                      productPrice:0,
                      quantity:0,
                      bestSeller:false,
                      hotSale:false, // sending 1 or 0
                      socialMedias:[{name:'', URL:''}] 
                    }} 
                    onSubmit={(data,{setSubmitting})=>{
                      let categoriesIds = []
                      data.category.forEach(item=>categoriesIds.push(item.value))
                      const requestData = {
                        ...data,
                        hotSale:data.hotSale?1:0,
                        category:categoriesIds
                      }
                      setSubmitting(true);
                      createProduct(requestData).then(res=>{
                        setSubmitting(false)
                        getProduct()
                      },err=>{
                        setSubmitting(false)
                        if(err.response){
                          const error = err.response.data
                          setError(error)
                        }
                        if(err.request){
                          console.log("Network failed")
                        }
                      })
                    }}
                    validationSchema={ProductModalSchema}
                  >
                  {({values, errors,isSubmitting,touched, handleChange})=>
                    (<Controls.CustomForm>
                      <Grid container spacing={3} >
                        <Grid item xs={12}>
                          <InputField
                            name="productName"
                            label="Name"
                            type="text"   
                          />
                          <span className="text-danger">{error.productName}</span>
                          <InputField
                            name="productImageUrl"
                            label="Image Url" 
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <InputField 
                            name="productDescription"
                            label="Description" 
                            multiline
                            rows={4}  
                          />
                        </Grid>
                        <Grid item xs={12}>
                          {/* <CustomSelect
                            name="Category"
                            options={categoryType.categoryType()}
                          /> */}
                          <Field
                            name="category"
                            id="category"
                            options={categoryIds}
                            component={FormikAutocomplete}
                            getOptionLabel={(option) => option.label}
                            getOptionSelected={(option,values)=>option.value===values.value}
                            textFieldProps={{
                                label: 'Select Category',
                                variant: 'outlined',
                                // size:"small",
                                margin:'normal',
                                fullWidth:true, 
                            }}
                            multiple
                          />
                        
                        </Grid>
                        <Grid item xs={3}>
                          <InputField 
                            name="productPrice"
                            label="Price"   
                          />  
                        </Grid>
                        <Grid item xs={3}>
                          <InputField 
                            name="quantity"
                            label="Quantity"  
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <FormFields.CheckBoxField
                          label="Best Seller"
                          name="bestSeller"
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <FormFields.CheckBoxField
                          label="Hot Sale"
                          name="hotSale"
                          />
                        </Grid>
                          <FieldArray name="socialMedias">
                          {({push, remove})=>(
                            <React.Fragment>
                              <Grid item>
                                  <Typography variant="h6">Social Media</Typography>
                              </Grid>
                                {values.socialMedias.map((_, index)=>(
                                  <Container>
                                    <Card>
                                      <CardContent>
                                        <Grid container spacing={2} style={{position:"relative"}}>
                                          <Grid item xs={6} >
                                            <InputField
                                            fullWidth 
                                            name={`socialMedias.${index}.name`} 
                                            label="Social Media Type" 
                                            />
                                          </Grid>
                                          <Grid item xs={6} >
                                            <InputField 
                                            fullWidth
                                            name={`socialMedias.${index}.URL`} 
                                            label="Social Media URL"
                                            />
                                          </Grid>
                                         {values.socialMedias.length>1 &&
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
                                <button type="submit" style={{backgroundColor:'#00CCFF', color:'#fff',float:"right"}}
                                  
                                  onClick={()=>push({
                                    name:'', 
                                    URL:''
                                  })}
                                >
                                    ADD+
                                </button>
                              </Grid>
                            </React.Fragment>
                          )}        
                        </FieldArray>
                                  
                          {isEdit?
                          <Grid item xs={12}>
                            <Controls.CustomButton 
                                  text="Update Product"
                                  disabled={isSubmitting}
                                  variant="contained"
                                  type="submit"
                                  style={{width:'100%', fontSize:'16px'}} 
                            >Update Product</Controls.CustomButton> 
                            </Grid>
                          :
                            <Grid item xs={12}>
                              <Controls.CustomButton  
                                  text="Create Product"
                                  variant="contained"
                                  type="submit"
                                  disabled={isSubmitting}
                                  style={{width:'100%', fontSize:'16px'}}
                              >Create Product</Controls.CustomButton> 
                            </Grid>
                          }

                      </Grid>
                      <Persist name="create-product" />
                      <pre>{JSON.stringify({values, errors}, null, 4)}</pre>
                  </Controls.CustomForm> 
                  )}
                              
                        </Formik>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                    </Modal>
        </React.Fragment>
    )
}

Products.propTypes = {
  logout:PropTypes.func.isRequired,
  postProduct:PropTypes.func.isRequired
}

const mapStateToProps = state =>({
  product:state.productReducer.product,
  categories:state.categoryReducers.categories,
  products:state.productReducer.products,
})

export default connect(mapStateToProps, {logout, postProduct,deleteProduct,getAllProduct, getProduct, getCategory}) (Products)

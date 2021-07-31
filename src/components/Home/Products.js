import React, {useState} from 'react'
import {Card, 
    CardContent,
    Typography,
    makeStyles, Avatar, Grid, Container,Button,CircularProgress} from '@material-ui/core'
import {Navbar,Nav, Table} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { getAllProduct, getProduct,deleteProduct,postProduct } from "../../actions/productActions";
import { getCategory } from "../../actions/categoryActions";
import {Modal,ModalHeader,ModalBody, ModalFooter } from 'reactstrap';
import { FieldArray, Formik, Field} from "formik";
import Controls from "../FormControls/controls";
import { ProductModalSchema } from "../../utils/ValidationSchema";
import SwapVertIcon from '@material-ui/icons/SwapVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { logout } from "../../actions/authenticationAction";
import InputField from "../FormFields/InputField";
import FormFields from '../../components/FormFields'
import { FormikAutocomplete } from "../FormFields/FormikAutocomplete";
import { useEffect } from 'react';
// import  {createProduct}  from "../../services/productService";
import { Persist } from "formik-persist";
// import ProductTable from './ProductTable';
import { httpClient } from '../../utils/Config';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ReactPaginate from "react-paginate"
import CustomSorting from "../FormFields/CustomSorting";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
// import logo from "../assets/logo.PNG";


const url= "/product"

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
              backgroundColor:'#2886C8',
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
            justifyContent: 'center',
            paddingTop:'60px',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        title:{
            fontSize:27,
            fontWeight:600,
        },
        btnDelete:{
            backgroundColor:'#BC1F27',
            color:"#fff",
        },
        btnEdit:{
            backgroundColor:'#2886C8',
            color:'#fff',
            marginRight:'9px',
    
        }, 
        modalTitle:{
            fontSize:20,
            textAlign:'center'
        },
        topRight:{
          position: 'absolute',
          top: '0px',
          right: '0px',
        },
      }));
    

const Products=({getProduct,getCategory,logout,categories,products,postProduct,product,allProducts, props})=> {

    const classes = useStyles()
    // const initialState = {
    //   productName:'',
    //   productImageUrl:'',
    //   productDescription:'',
    //   category:[],
    //   productPrice:0,
    //   quantity:0,
    //   bestSeller:false,
    //   hotSale:false, // sending 1 or 0
    //   socialMedias:[{name:'', URL:''}] 
    // }
    const [isEdit, setIsEdit] = useState(false)
    const [error, setError] = useState({})
    const [modal, setModal] = useState(false)
    // const [ setPro] = useState(initialState)

    // pagination
    const [pageNumber, setPageNumber] = useState(0)
    const productPerPage = 8
    const pagesVisited = pageNumber * productPerPage 
    const displayProduct = products.slice(pagesVisited, pagesVisited + productPerPage)
    const pageCount = Math.ceil(products.length / productPerPage)
    const changePage =({selected}) =>{
        setPageNumber(selected)
    }

      // Sorting
    const { items, requestSort,sortConfig } = CustomSorting(displayProduct);
    // console.log(items);
    
    const getClassNamesFor = (name) => {
      if (!sortConfig) {
        return;
      }
      return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    useEffect(()=>{
      getProduct()
    }, [getProduct])

    // console.log(products);
    
    useEffect(()=>{
      getCategory()
    }, [getCategory])

    const toggle=()=>{
        setModal(!modal)
    }

    // const updateToggle=()=>{
    //     setIsEdit(true)
    //     toggle()
    // }

    // update all 
    // const updateEditProduct=(_id,data)=>{
    //   return httpClient.put(`${url}/${_id}`,data)
    // }

    const getSingleProduct =(_id)=>{
      return httpClient.get(`${url}/${_id}`)
    }

    const updateToggle = async(_id) =>{
      setIsEdit(true)
      await getSingleProduct(_id)
      .then(res=>{
        // setPro(res.data.data)
      })
      setModal(true)
      getProduct()
    }

    const deleteProductById=(_id)=>{
      httpClient.delete(`${url}/${_id}`)
      .then(res=>{
        getCategory()
      })
      
    }

    let categoryIds = [];
    categories!==null&&categories!==undefined&&categories.length>0&&
    categories.forEach(item=>{
      categoryIds.push({
        label:item.name,
        value:item._id
      })
    })

    const closeBtn = <button className="close" onClick={toggle}>&times;</button>

    // react-bootstrap-table and pagination start from here
    
    return (
        <React.Fragment>
          <Navbar bg="light" expand="lg" variant="light" className="shadow p-3 mb-4 bg-white rounded" id="navbarHead"> 
            <Navbar.Brand className="ml-1"> <Link to="/home">ovaStore </Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/category">
                      <Button color="secondary" className="categoryButton" href="#text-buttons">Category</Button>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/product" >
                      <Button href="#text-buttons" className="categoryButton ">Product</Button>
                    </Nav.Link>
                    <Nav.Link className="pt-3">
                      <Avatar  className={classes.avatarColor}/>
                    </Nav.Link>
                    <Nav.Link className="pt-3" as={Link} to="/" onClick={()=>logout()}>
                        <ExitToAppIcon fontSize="large" className="mt-1 ml-2 categoryExit" />
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
          </Navbar>
            <div className="container-fluid categoriesSmall">
              <div className="p-5 categorieSmall">
                <div className="row">
                  <div className="col-6 col-md-6">
                      <h5 className={classes.title}>Manage Products</h5>
                  </div>
                  <div className="col-2 col-md-2"> 
                    <span style={{fontSize:20, fontWeight:'lighter', paddingRight:'10px'}}> <SwapVertIcon />Sort </span>
                    <div className="dropdown">
                      <button className="dropbtn"><KeyboardArrowDownIcon /> </button>
                      <div className="dropdown-content">
                        <button onClick={()=>requestSort('productName')} className={getClassNamesFor('productName')} >Name</button>
                        <button onClick={()=>requestSort('createdAt')} className={getClassNamesFor('createdAt')} >CreatedAt</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-4 col-md-4">
                    <button className="btn btn-outline-primary float-right" style={{backgroundColor:'#2886C8', color:'#fff', fontWeight:600}} onClick={toggle}  >
                        <i className="fa fa-plus"></i> Add New Product
                    </button>
                  </div>  
                </div> <hr color="#00CCFF" />
              </div>
              {/* Pagination and Search Button start here */}
              <div className="card">
                <div className="card-body pt-1">                  
                  <Table striped bordered hover responsive="sm">
                      <thead>
                        <tr>
                          <th>Product Name</th>
                          <th>Product Image Url</th>
                          <th>Product Description</th>
                          <th>Price</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                    {items.map(item=>{
                      return(
                          <tbody key={item._id}>
                            <tr>
                              <td>{item.productName}</td>
                              <td >{item.productImageUrl}</td>
                              <td>{item.productDescription}</td>
                              <td>{item.productPrice}</td>
                              <td>
                                <div className="d-flex">
                                    <button onClick={()=>updateToggle(item._id)} className={classes.btnEdit}  >EDIT</button>
                                    <button onClick={(_id)=>deleteProductById(item._id)} className={classes.btnDelete} >DELETE</button> 
                                </div> 
                              </td>
                            </tr>
                          </tbody>
                        )
                      })
                    }
                  </Table>
                </div>
              </div>
              {/* Pagination and Search button ends here */} 
              <div>
                <h5>Showing result {pagesVisited} - {pageNumber} of {pageCount} </h5>
              </div>
              <ReactPaginate 
                    previousLabel={<SkipNextIcon style={{fontSize:20}}/>}
                    nextLabel={<SkipNextIcon style={{fontSize:20}}  />}
                    pageCount={pageCount} 
                    onPageChange={changePage}
                    containerClassName={"paginationButtonProduct"} 
                    previousLinkClassName={"previousButton"}
                    nextLinkClassName={"nextButton"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                />
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
                    onSubmit={async(data,{setSubmitting})=>{
                      let categoriesIds = []
                      data.category.forEach(item=>categoriesIds.push(item.value))
                      const requestData = {
                        ...data,
                        hotSale:data.hotSale?1:0,
                        category:categoriesIds
                      }
                        setSubmitting(true);
                        postProduct(requestData).then(res=>{
                        setSubmitting(false)
                        toggle()
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
                                          <Container key={index}>
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
                                        <button type="submit" style={{backgroundColor:'#2886C8', color:'#fff',float:"right"}}                                  
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
                                          startIcon={isSubmitting ? <CircularProgress size="1rem"/> :null}
                                          text="Update Product"
                                          disabled={isSubmitting}
                                          variant="contained"
                                          type="submit"
                                          style={{width:'100%', fontSize:'16px',backgroundColor:'#2886C8'}} 
                                    >Update Product</Controls.CustomButton> 
                                    </Grid>
                                  :
                                    <Grid item xs={12}>
                                      <Controls.CustomButton  
                                          startIcon={isSubmitting ? <CircularProgress size="1rem"/> :null}
                                          text="Create Product"
                                          variant="contained"
                                          type="submit"
                                          disabled={isSubmitting}
                                          style={{width:'100%', fontSize:'16px',backgroundColor:'#2886C8'}}
                                      >Create Product</Controls.CustomButton> 
                                    </Grid>
                                  }
                              </Grid>
                              <Persist name="create-product" />
                              {/* <pre>{JSON.stringify({values, errors}, null, 4)}</pre> */}
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
}

const mapStateToProps = state =>({
  products:state.productReducer.products,
  allProducts:state.productReducer.allProducts,
  categories:state.categoryReducers.categories,
})

export default connect(mapStateToProps, {logout,deleteProduct,getAllProduct, getProduct, getCategory,postProduct}) (Products)

import React, {useState} from 'react'
import { connect } from "react-redux";
import { getCategory,postCategory,deleteCategory,updateCategory } from "../../actions/categoryActions";
import {Navbar,Nav} from 'react-bootstrap'
import {
    makeStyles, Avatar, Grid, Container,Button,CircularProgress} from '@material-ui/core'
import { Link } from "react-router-dom";
import {Modal,ModalHeader,ModalBody, ModalFooter } from 'reactstrap';
import {Formik} from 'formik'
import Controls from "../FormControls/controls";
import { CategorySchema } from "../../utils/ValidationSchema";
import SwapVertIcon from '@material-ui/icons/SwapVert';
import CategoryTable from "./CategoryTable";

import { useEffect } from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PropTypes from 'prop-types';
import { logout } from "../../actions/authenticationAction";
import InputField from "../FormFields/InputField";
import {useHistory  } from "react-router-dom";
import { httpClient } from "../../utils/Config";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import CustomSorting from "../FormFields/CustomSorting";
// import logo from '../assets/logo.PNG'

const url= "/category"

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
      backgroundColor:'#00CCFF',
      color:'#fff',
      marginRight:'9px'
    }, 
    modalTitle:{
      fontSize:20,
      textAlign:'center'
    },
    formInput:{
      margin:theme.spacing(1),
      width:'100%'
    }
  }));
    

const ProductCategories=({categories,postCategory, getCategory, logout,updateCategory})=> {
    const history = useHistory();
    const initialState={
          name:'',
          description:'',
      }
    const classes = useStyles()
    const [isEdit, setIsEdit] = useState(false)
    const [category, setCategory] = useState(initialState)
    const [modal, setModal] = useState(false)
    // const formRef = useRef();

    // console.log(categories);
    const { requestSort, sortConfig} = CustomSorting(categories)
    const getClassNamesFor = (name) => {
      if (!sortConfig) {
        return;
      }
      return sortConfig.key === name ? sortConfig.direction : undefined;
    };
    
    useEffect(()=>{
      getCategory()
    },[getCategory])

    const toggle=()=>{
      setModal(!modal)
      resetFormData()
    }

    // const handleChange = e =>{
    //   setCategory({
    //     [e.target.name] : e.target.value
    //   })
    // }

    const resetFormData =()=>{
      setCategory({
        name:"",
        description:""
      })
    }

    const updateEditCategory=(_id,data)=>{
      return httpClient.put(`${url}/${_id}`,data)
    }

    // const getSingleCategory =(_id)=>{
    //   return httpClient.get(`${url}/${_id}`)
    // }

    // const toggleUpdate = async(_id) =>{
    //   setIsEdit(true)
    //   await getSingleCategory(_id)
    //   .then(res=>{
    //     setCategory(res.data.data)
    //   })
    //   setModal(true)
    //   getCategory()
    // }



    const toggleUpdate=(_id)=>{
      setIsEdit(true)
      toggle()
      getSingleCategory(_id)
    }

    const getSingleCategory=(_id)=>{
      const url="/category"
      setIsEdit(true)
      httpClient.get(`${url}/${_id}`)
      .then(res=>{
        // setCategory({
        //   _id:res.data.data._id,
        //   name:res.data.data.name,
        //   description:res.data.data.description,
        //   // _id:formRef.current.values._id,
        //   // name:formRef.current.values.name,
        //   // description:formRef.current.values.description,
        // })
      })
    }

    const deleteCategoryById=(_id)=>{
      httpClient.delete(`${url}/${_id}`)
      .then(res=>{
      })
      getCategory()
    }

    // const {name, description} = category
const closeBtn = <button className="close" onClick={toggle}>&times;</button>

    return (
      <React.Fragment>
       <Navbar bg="light" expand="lg" variant="light" className="shadow p-3 mb-4 bg-white rounded" id="navbarHead"> 
          <Navbar.Brand className="ml-1"> <Link to="/home">ovaStore </Link>  </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                  <Nav.Link as={Link} to="/category" >
                    <Button color="secondary" className="categoryButton" href="#text-buttons">Category</Button>
                  </Nav.Link>
                  <Nav.Link as={Link} to="/product"  >
                    <Button href="#text-buttons" className="categoryButton ">Product</Button>
                  </Nav.Link>
                  <Nav.Link className="pt-3">
                    <Avatar  className={classes.avatarColor}/>
                  </Nav.Link>
                  <Nav.Link className="pt-3" as={Link} to="/" onClick={()=>logout()}>
                      <ExitToAppIcon  fontSize="large" className="mt-1 ml-2 categoryExit" />
                  </Nav.Link>
              </Nav>
          </Navbar.Collapse>
        </Navbar>
          <div className="container-fluid p-5 categoriesSmall">
            <div className="p-5 categorieSmall">
              <div className="row">
                <div className="col-6 col-md-6 manageCategory">
                  <h5 className={classes.title}>Manage Categories</h5>
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
                {/* <div className="col-md-1"> 
                </div> */}
                <div className="col-4 col-md-4">
                  <button className="btn btn-outline-primary float-right" style={{backgroundColor:'#2886C8', color:'#fff', fontWeight:600}} onClick={toggle}  >
                      <i className="fa fa-plus"></i> Add New Categories
                  </button>
                </div>     
              </div> <hr color="#00CCFF" />
            </div>
                  {/* Pagination and Search Button start here */}
            <div className="card">
              <div className="card-body pt-1">
                <CategoryTable 
                  categories={categories}
                  toggleUpdate={toggleUpdate}
                  deleteCategoryById={deleteCategoryById}
                />
              </div>
            </div>
          </div>
          {/* Modal start here */}

          <Modal 
            isOpen={modal} 
            toggle={toggle} 
            size="lg"
            backdrop="static"
          >
          <ModalHeader toggle={toggle} close={closeBtn} className={classes.modalTitle} >Create New Category</ModalHeader>
            <ModalBody>
              <Formik
                initialValues={{
                  name:'',
                  description:''
                }}
                // onSubmit={async(data,{setSubmitting})=>{
                //   setSubmitting(true);
                //   postCategory(data, history)
                //   toggle()
                //   getCategory()
                // }
                onSubmit={async(data,{setSubmitting})=>{
                  setSubmitting(true);
                  isEdit?updateEditCategory(category._id, data).then(res=>{
                  toggle()
                  setSubmitting(false)
                  setIsEdit(false)
                  getCategory()
                  })
                  :postCategory(data, history).then(res=>{
                    setSubmitting(false)
                    toggle()
                    getCategory()
                  })
                }
              }
                 validationSchema={CategorySchema} 
              >
                {({values, errors,submitForm,isSubmitting})=>(
                  <Controls.CustomForm >
                    <Grid  container spacing={3}>
                      <Grid item xs={12} style={{marginRight:"10px"}}>
                        <InputField 
                          fullWidth
                          name="name"
                          label="Category Name"
                        />
                        <InputField 
                          fullWidth
                          name="description"
                          label="Description" 
                          multiline
                          rows={5} 
                        />
                      </Grid>
                    </Grid>
                  <Container>
                      {/* <pre>{JSON.stringify(values,null,2)}</pre> */}
                      {/* <Button type="submit" disabled={isSubmitting}>Create </Button> */}
                    </Container>

                    { isEdit ? 
                      <Grid item xs={12}>
                        <Controls.CustomButton 
                          type="submit"
                          startIcon={isSubmitting ? <CircularProgress size="1rem"/> :null}
                          text="Update Category"
                          variant="contained"
                          style={{width:'100%', fontSize:'16px', backgroundColor:'#2886C8'}}
                          disabled={isSubmitting}
                        /> 
                      </Grid>
                      : 
                      <Grid item xs={12}>
                        <Controls.CustomButton 
                          type="submit"
                          startIcon={isSubmitting ? <CircularProgress size="1rem"/> :null}
                          text="Create Category"
                          variant="contained"
                          style={{width:'100%', fontSize:'16px',backgroundColor:"#2886C8"}}
                          disabled={isSubmitting}
                        /> 
                      </Grid>
                    }   

                  </Controls.CustomForm>
                  )
                }
              </Formik> 
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
        </Modal>
      </React.Fragment>
    )
}

ProductCategories.propTypes = {
  logout:PropTypes.func.isRequired,
  postCategory:PropTypes.func.isRequired
}

const mapStateToProps=  state =>({
  categories:state.categoryReducers.categories
})
export default connect(mapStateToProps,
                      {getCategory,
                      postCategory,
                      deleteCategory,
                      updateCategory,
                      logout}) 
                      (ProductCategories)
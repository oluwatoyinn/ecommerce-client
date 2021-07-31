// import React, {useState} from 'react'
// import { Card, 
//   CardContent,
//   Typography,
//   Button, 
//   makeStyles, 
//   TableBody, 
//   TableRow, 
//   TableCell,Modal,Backdrop, Fade,Grid, FormControl, RadioGroup,Radio, FormControlLabel, FormLabel } from '@material-ui/core'
// import CustomTable  from '../components/FormControls/CustomTable'
// import Container from '@material-ui/core/Container';
// import CustomForm from './FormControls/CustomForm'
// import CustomInput from './FormControls/CustomInput';
// import Controls from './FormControls/controls'
// import {Form, Formik } from 'formik'


// const useStyles = makeStyles((theme) => ({
//     root: {
//       backgroundColor:'#fff',
//       transform:'translateZ(0)',
      
//     },
//       tableRightBorder: {
//         borderWidth: 2,
//         borderRightWidth: 1,
//         borderBlock:3,
//         borderColor: 'grey',
//         borderStyle: 'solid',
//         // border:"2px 3px"
//     },
//     modal: {
//         // display: 'flex',
//         // alignItems: 'center',
//         justifyContent: 'center',
//         paddingTop:'60px',
//         // width:'100%',
        
//     },
//     paper: {
//         backgroundColor: theme.palette.background.paper,
//         border: '2px solid #000',
//         boxShadow: theme.shadows[5],
//         padding: theme.spacing(2, 4, 3),
//     },
//     title:{
//         // textAlign:'center',
//         fontSize:27,
//         fontWeight:600,
//     }
//   }));

//   const TableHeadCells = [
//     {id:'1', label:'#'},
//     {id:'2', label:'Product Name'},
//     {id:'3', label:'Product Image Url'},
//     {id:'4', label:'Product Description' },
//     {id:'5', label:'Product Category' },
//     {id:'6', label:'Price'},
//     {id:'7', label:'Product Quantity'},
//     {id:'8', label:'Actions'},
// ]

// const Product=(props) =>{


//     const classes = useStyles()
//     const [open, setOpen] = useState(false);
//     const [isEdit, setIsEdit] = useState(false)
//     const handleOpen = () => {setOpen(true) };
//     const handleClose = () => {setOpen(false)};

//     const toggleUpdate =() =>{
//       setIsEdit(true)
//       handleOpen()
//     }

//     const {
//         TableContainer,
//         TableHeaders,
//         TableContent,
//         TblPagination,

//     } = CustomTable(
//                     TableHeadCells, 
//                     ) 

//     return (
//         <React.Fragment>
//             <Card>
//                 <CardContent>
//                 <div>
//                        <Typography variant="h6" className={classes.title}>Product <Button onClick={handleOpen} style={{float:'right', backgroundColor:'#00CCFF'}} variant="contained" color="secondary" >Add New product</Button></Typography>
//                         {/* <Button style={{float:'right'}} variant="contained" color="secondary">Add New product</Button>  */}
//                     </div>
//                     <hr color="#00CCFF" />
//                     <TableContainer>
//                         <TableHeaders/>
//                         <TableBody >
//                       {
//                         //   employees.map(item=>(
//                             // employeeAfterPaginationAndSorting().map(item=>(
//                               <TableRow  className={classes.tableRightBorder}>
//                                   <TableCell >  </TableCell>
//                                   <TableCell> </TableCell>
//                                   <TableCell>  </TableCell>
//                                   <TableCell>  </TableCell>
//                                   <TableCell> </TableCell>
//                                   <TableCell>  </TableCell>
//                                   <TableCell>  </TableCell>
//                                   <TableCell>
//                                     <Button variant="contained" onClick={()=>toggleUpdate()} style={{marginRight:'10px', backgroundColor:'#00CCFF', color:'#fff'}} >Edit</Button>
//                                     <Button variant="contained" color="secondary">Delete</Button>
//                                 </TableCell>
//                               </TableRow>
//                         //   ))
//                       }
//                   </TableBody>
//                     </TableContainer>
//                 </CardContent>
//             </Card>

//             {/* modal start from here  */}

//             <Modal
//                 aria-labelledby="transition-modal-title"
//                 aria-describedby="transition-modal-description"
//                 className={classes.modal}
//                 open={open}
//                 onClose={handleClose}
//                 closeAfterTransition
//                 // BackdropComponent={Backdrop}
//                 // BackdropProps={{
//                 // timeout: 500,
//                 // }}
//             >
//                 {/* <Fade in={open}> */}

//                 <Container maxWidth="md">
//                     <Card>
//                         <CardContent>
//                        <Typography variant="h6" className={classes.title}>Create New Product</Typography>
//                         <CustomForm>
//                             <Grid container spacing={3}>
//                                 <Grid item xs={12}>
//                                     <CustomInput 
//                                             name="firstName"
//                                             label="First Name"  
//                                         />
//                                         <CustomInput 
//                                             name="imageUrl"
//                                             label="Image Url"   
//                                         />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <CustomInput 
//                                             name="description"
//                                             label="Description" 
//                                             multiline
//                                             rows={4} 
//                                         />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <CustomInput 
//                                             name="categories"
//                                             label="Categories"  
//                                         />
//                                 </Grid>
//                                 <Grid item xs={4}>
//                                     <CustomInput 
//                                             name="price"
//                                             label="Price"  
//                                         />
//                                 </Grid>
//                                 <Grid item xs={4}>
//                                     <CustomInput 
//                                             name="quantity"
//                                             label="Quantity"  
//                                         />
//                                 </Grid>
//                                 <Grid item xs={4} >
//                                     <FormControl >
//                                     <FormLabel>Tags</FormLabel>
//                                         <RadioGroup row 
//                                         name="tags"
//                                         >
//                                         <FormControlLabel value="best-seller" control={<Radio/>} label="Best Seller"/>
//                                         <FormControlLabel value="hot-sales" control={<Radio/>} label="Hot Sales"/>
//                                         </RadioGroup>
//                                     </FormControl>
//                                 </Grid>
//                                 {isEdit?
//                                  <Grid item xs={12}>
//                                    <Controls.CustomButton 
//                                         text="Update Product"
//                                         variant="contained"
//                                         style={{width:'100%', fontSize:'16px'}}
//                                    /> 
//                                   </Grid>
//                                 :
//                                   <Grid item xs={12}>
//                                     <Controls.CustomButton 
//                                         text="Create Product"
//                                         variant="contained"
//                                         style={{width:'100%', fontSize:'16px'}}
//                                     /> 
//                                   </Grid>
//                                 }
//                             </Grid>
//                        </CustomForm> 
//                         </CardContent>
//                     </Card>
                        
//                 </Container>
//                 {/* </Fade> */}
//             </Modal>
            
//         </React.Fragment>
//     )
// }


// export default Product



import React, {useState} from 'react'
import { Card, 
  CardContent,
  Typography,
  Button, 
  makeStyles, 
  TableBody, 
  TableRow, 
  TableCell,Modal,AppBar, Toolbar, Avatar } from '@material-ui/core'
import CustomTable  from '../components/FormControls/CustomTable'
import Container from '@material-ui/core/Container';
import CustomForm from './FormControls/CustomForm'
import CustomInput from './FormControls/CustomInput';
import {CustomInput2} from './FormControls/CustomInput'
import Controls from './FormControls/controls'
import {Form, Formik } from 'formik'
import {ProductModalSchema} from '../utils/ValidationSchema'
import Productmodalform from '../Trash/ProductModalForm';
import {Link  } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';



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
    }
  }));

  const TableHeadCells = [
    {id:'1', label:'#'},
    {id:'2', label:'Product Name'},
    // {id:'3', label:'Product Image Url'},
    {id:'4', label:'Product Description' },
    {id:'6', label:'Price'},
    {id:'5', label:'Product Category' },
    {id:'7', label:'Product Quantity'},
    {id:'8', label:'Actions'},
]

const Product=(props) =>{


    const classes = useStyles()
    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false)
    const handleOpen = () => {setOpen(true) };
    const handleClose = () => {setOpen(false)};

    const toggleUpdate =() =>{
      setIsEdit(true)
      handleOpen()
    }

    const {
        TableContainer,
        TableHeaders,
        TableContent,
        TblPagination,

    } = CustomTable(
                    TableHeadCells, 
                    ) 

    return (
        <React.Fragment>
          <AppBar position="static" className={classes.root}>
                <Toolbar >
                  <Link to="/home" style={{textDecoration:"none"}}>
                    <Typography variant="h6" className={classes.title}>
                        eTranzact
                    </Typography>
                  </Link>
                 
                
                  <div style={{margin:'8px', paddingLeft:"900px"}}>
                    <Link to="/product" style={{textDecoration:"none"}} > <Button className={classes.categoryButton} >PRODUCT</Button>  </Link>
                    <Link to="category" style={{textDecoration:"none"}}> <Button className={classes.categoryButton}   >CATEGORY</Button> </Link>
                  </div>
                <div style={{paddingLeft:"950px"}}>
                   <Avatar className={classes.avatarColor}/>
                   <ExitToAppIcon  fontSize="large" style={{margin:"20px"}} />
                </div>
                </Toolbar>
            </AppBar>
            <Card>
                <CardContent>
                <div>
                       <Typography variant="h6" className={classes.title}>Product <Button onClick={handleOpen} style={{float:'right', backgroundColor:'#00CCFF'}} variant="contained" color="secondary" >Add New product</Button></Typography>
                        {/* <Button style={{float:'right'}} variant="contained" color="secondary">Add New product</Button>  */}
                    </div>
                    <hr color="#00CCFF" />
                    <TableContainer>
                        <TableHeaders/>
                        <TableBody >
                      {
                        //   employees.map(item=>(
                            // employeeAfterPaginationAndSorting().map(item=>(
                              <TableRow  className={classes.tableRightBorder}>
                                  <TableCell >  </TableCell>
                                  <TableCell> </TableCell>
                                  <TableCell>  </TableCell>
                                  <TableCell> </TableCell>
                                  <TableCell>  </TableCell>
                                  <TableCell>  </TableCell>
                                  <TableCell>
                                    <Button variant="contained" onClick={()=>toggleUpdate()} style={{marginRight:'10px', backgroundColor:'#00CCFF', color:'#fff'}} >Edit</Button>
                                    <Button variant="contained" color="secondary">Delete</Button>
                                </TableCell>
                              </TableRow>
                        //   ))
                      }
                  </TableBody>
                    </TableContainer>
                </CardContent>
            </Card>

            {/* modal start from here  */}

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                // BackdropComponent={Backdrop}
                // BackdropProps={{
                // timeout: 500,
                // }}
            >
                {/* <Fade in={open}> */}

                <Container maxWidth="md">
                    <Card>
                        <CardContent>
                       <Typography variant="h6" className={classes.title}>Create New Product</Typography>
                            <Productmodalform/>
                      </CardContent>
                    </Card>     
                </Container>
                {/* </Fade> */}
            </Modal>
            
        </React.Fragment>
    )
}


export default Product
import React, {useState} from 'react'
import {Navbar, Button, Modal,Nav,Container} from 'react-bootstrap'
import Login from "../authentications/Login";
import Register from "../authentications/Register";
import Home from "../components/Home/Home";
// import logo from "../components/assets/logo.PNG";

const NavBar = () =>{ 

    const [show, setShow] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const handleClose = () =>  setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () =>setShowRegister(true);

    return (
        <React.Fragment>
            <Navbar bg="light" expand="lg" variant="light" className="shadow p-3 mb-4 bg-white rounded" id="navbarHead">
                <Container fluid>  
                    <Navbar.Brand className="ml-3 logoCss"> ovaStore </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link>
                                <Button variant="primary" onClick={handleShow} className="loginButton">Login</Button>
                             </Nav.Link>
                            <Nav.Link >
                                <Button variant="primary" onClick={handleShowRegister} className="registerButton">Register</Button> 
                             </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>  
            </Navbar> 
            
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton style={{display:"flex",justifyContent: "center",alignItems: "center"}}>
                    <Modal.Title >Login an account  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <Login />
                </Modal.Body>
            </Modal>

            <Modal show={showRegister} onHide={handleCloseRegister} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title className="text-center">Register an account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Register />
                </Modal.Body>
            </Modal>
            <Home/> 
        </React.Fragment>
    )
}
export default NavBar



// import React, {useState} from 'react';
// import { makeStyles} from '@material-ui/core/';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';

// import Controls from "../components/FormControls/controls";
// import CustomPopUp from "../components/FormControls/CustomPopUp";
// import Register from "../authentications/Register";
// import Login from '../authentications/Login';
// import Home  from '../components/Home/Home';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor:'#fff',
//     transform:'translateZ(0)',
//     '& > *': {
//         margin: theme.spacing(1),
//       },
//     '& button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary':{
//         marginRight:'20px'
//     }
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//     color:'#00CCFF',
//     fontSize:24

//   },
// }));

// const  NavBar = () => {

//     const [openPopup, setOpenPopup] = useState(false) 
//     const [openLog, setOpenLog] = useState(false) 

//     const classes = useStyles();

//   return (
//       <React.Fragment>
//             <AppBar position="static" className={classes.root}>
//                 <Toolbar>
//                 <Typography variant="h6" className={classes.title}>
//                     eTranzact
//                 </Typography>
//                 <Controls.CustomButton 
//                     text="LOGIN"
//                     variant="contained"
//                     onClick={()=>setOpenLog(true)}
//                 />
//                 <Controls.CustomButton 
//                     text="REGISTER"
//                     variant="contained"
//                     onClick={()=>setOpenPopup(true)}
//                 />
//                 </Toolbar>
//             </AppBar>

//             <CustomPopUp
//                 title="eTranzact ecommerce"
//                 subTitle="Create an account to list your own products"
//                 openPopup ={openPopup}
//                 setOpenPopup={setOpenPopup}
//             >  
//             <Register />
//             </CustomPopUp>

//             <CustomPopUp
//                 title="eTranzact ecommerce"
//                 subTitle="Login to manage your products"
//                 openPopup ={openLog}
//                 setOpenPopup={setOpenLog}
//             >  
//             <Login />
//             </CustomPopUp>

//             <Home />

//         </React.Fragment> 

//   );
// }

// export default NavBar
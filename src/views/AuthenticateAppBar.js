import React from 'react';
import { makeStyles, Avatar, Button} from '@material-ui/core/';
import {Link  } from "react-router-dom";
// import Home from "../components/Home/Home";
import HomePage from "./HomePage";
import {connect} from 'react-redux'
import { logout } from "../actions/authenticationAction";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Navbar,Nav,Container} from 'react-bootstrap'
// import logo from "../components/assets/logo.PNG";



const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor:'#fff',
    transform:'translateZ(0)',
    color:'#00CCFF',
    '& > *': {
        margin: theme.spacing(1),
      },
    // '& button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary':{
    //     marginRight:'20px'
    // }
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontSize:24,
    color:'#00CCFF'
  },
  adminButton:{
      color:'#00CCFF',
      fontSize:20,
      alignItems:'center',
      textDecoration:'none'
  },
  avatarColor:{
      backgroundColor:'#2886C8',
  },
  adminCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryButton:{
    color:'#00CCFF',
    fontSize:20,
    textDecoration:"none"
  },
  navLink:{
    backgroundColor: 'white',
    padding: '10px 20px',
    width:' 100px',
    border: 'none',
    borderRadius: '2px',
    display: 'inline',
    alignItems:'center'
  },
  navbar:{
    marginLeft:' 5%',
    marginRight:' 5%'
  },
  btnButton:{
    height: '60px',
    lineHeight: '60px'
  },
  nav:{
    display: "inline",
    listStyleType: 'none'
  }
}));

const  NavBar = (props) => {

    const classes = useStyles();

  return (
      <React.Fragment>
        <Navbar bg="light" expand="lg" variant="light" className="shadow p-3 mb-4 bg-white rounded" id="navbarHead">
            <Container fluid>  
                <Navbar.Brand className="ml-1 navbarBrand"> ovaStore </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/category">
                          <Button className="categoryButton" href="#text-buttons">Category</Button>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/product">
                          <Button href="#text-buttons" className="categoryButton">Product</Button>  
                        </Nav.Link>
                        <Nav.Link className="pt-3">
                          <Avatar  className={classes.avatarColor}/>
                        </Nav.Link>
                        <Nav.Link className="pt-3" to="/" onClick={()=>props.logout()}>
                            <ExitToAppIcon  fontSize="large" className="mt-1 ml-2 categoryExit" />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>  
        </Navbar> 
        <HomePage/>
      </React.Fragment> 
  );
}
export default connect(null, {logout}) (NavBar)
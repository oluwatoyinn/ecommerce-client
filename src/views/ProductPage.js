import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Container } from '@material-ui/core/';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Product from '../components/Product';
import ProductCategory from '../components/ProductCategory';
import AboutEcommerce from "./AboutEcommerce";



const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor:'#fff',
    transform:'translateZ(0)',
    color:'#00CCFF',
    fontSize: 27,
    '& > *': {
        margin: theme.spacing(1),
      },
    '& button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary':{
        marginRight:'20px'
    }
  },
  menuButton: {
    color:'#00CCFF',
    fontSize: 21
  },
  title: {
    flexGrow: 1,
    color:'#00CCFF',
  },
}));

// Tabs start here
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={2}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

//   Tabs ends here
export default function NavBar() {


    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

  return (
      <React.Fragment>
        <Container maxWidth="xl">
            <AppBar position="static" className={classes.root}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        eTranzact
                    </Typography>
                    <div style={{float:'left'}} >
                      <Tabs value={value}  onChange={handleChange} aria-label="simple tabs example">
                          <Tab   {...a11yProps(0)} />
                          <Tab label="Products" {...a11yProps(1)} />
                          <Tab label="Category" {...a11yProps(2)} />
                      </Tabs>
                    </div>
                </Toolbar>
            </AppBar>
            <TabPanel value={value} index={0}>
                <AboutEcommerce />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Product />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ProductCategory />
            </TabPanel>
        </Container>
           
        </React.Fragment>
            
    

  );
}

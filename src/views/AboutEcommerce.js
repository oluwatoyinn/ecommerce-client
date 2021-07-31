import React from 'react'
import { makeStyles, 
  Container, Grid, 
  Typography
} from '@material-ui/core/';

// import ScrollImage from "../components/assets/cook2"
import image from "../components/assets/home-min.jpg";
import img_1 from "../components/assets/rice.jpg";
import img_2 from "../components/assets/oil.jpg";
import img_3 from "../components/assets/pepsi.jpg";
import img_4 from '../components/assets/milo.jpg'
import img_5 from "../components/assets/milo1.jpg";
import img_6 from "../components/assets/pepsi1.jpg";
import img_7 from "../components/assets/rice1.jpg";


const ProductItems=[
  {img:img_1, description:'50kg of Amanda Rice', price:'#5,000'},
  {img:img_2, description:'5kg of Royal Oil', price:'#2,000'},
  {img:img_3, description:'5 cans of pepsi', price:'#1,500', bestSeller:"BEST SELLER"},
  {img:img_4, description:'20kg can of milo', price:'#9,500'},
  {img:img_6, description:'5 can of pepsi', price:'#3,100'},
  {img:img_7, description:'20kg of rice', price:'#9,500'},
  {img:img_5, description:'50kg can of milo', price:'#2,300', bestSeller:"BEST SELLER"},
]

const foodItems=[
  {img:img_1, description:'50kg of Amanda Rice', price:'#5,000'},
  {img:img_2, description:'5kg of Royal Oil', price:'#2,000'},
  {img:img_3, description:'5 cans of pepsi', price:'#1,500'},
]

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      // paddingLeft:'0px',
      width:'100%',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    title: {
      fontSize: 29,
      fontWeight:600,
    },
  button: {
      margin: theme.spacing(1),
      float:'right'
    },
    container:{
        position:'relative'
    },
    bottomLeft:{
      position: 'absolute',
      bottom: '14px',
      left:'13px',
      fontSize: '18px'
    },
    topRight:{
      position: 'absolute',
      top: '8px',
      right: '16px',
      fontSize: '18px'
    },
    shopNowButton:{
      backgroundColor:'red',
      color:'#fff',
      padding:'3px 8px',
      fontSize:15,
      borderTopRightRadius:'20px',
      border:'1px solid white',
      cursor:'pointer'
      
    },
    sliderImage:{
      width:'100%',
      maxHeight:'600px'
    },
    title2:{
      fontSize:21,
      fontWeight:600,
      backgroundColor:'red',
      color:"#fff",
      borderTopLeftRadius:'7px',
      paddingLeft:'5px'
    },
    imageSizing:{
      float:'left',
      width:"225px",
      height:"225px",
      backgroundSize:'cover'
    }
  }));
export default function AboutEcommerce(props) {
    const classes = useStyles()

    return (
        <React.Fragment>
            <Container maxWidth="xl">
                <Grid container spacing={3}  style={{paddingTop:"30px"}}>
                  <Grid item xs={12} container className={classes.container}>
                    <img src={image} alt="" className="img-fluid" className={classes.sliderImage} />
                    <div className={classes.bottomLeft}> <button className={classes.shopNowButton}>SHOP NOW</button> </div>
                  </Grid>
                    <Grid item xs={6}>
                        <Typography  className={classes.title} variant="h6" component="div" >
                            About the eCommerce website
                        </Typography>
                        <p style={{fontSize:20, fontWeight:400}}>Groceries</p>
                        <p >Lorem ipsum dolor sit amet consectetur adipisicing elit.
                             Laudantium quae nostrum voluptas quisquam rerum ullam 
                             provident facere, tempore quod sed fuga obcaecati alias 
                             explicabo perspiciatis placeat quo. Reiciendis, voluptatum 
                             mollitia! Lorem ipsum dolor sit amet consectetur adipisicing 
                             elit. Sequi, qui. Est voluptatum quibusdam harum nulla!
                             Reiciendis, voluptatum mollitia! Lorem ipsum dolor sit 
                             amet consectetur adipisicing elit. Sequi, qui. Est voluptatum 
                             quibusdam harum nulla!. Sequi, qui. Est voluptatum quibusdam harum nulla!
                             Reiciendis, voluptatum mollitia! Lorem ipsum dolor sit 
                             amet consectetur adipisicing elit. Sequi, qui. Est voluptatum 
                             quibusdam harum nulla!
                        </p>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography  className={classes.title2} variant="h6" component="div" >
                            HOT SALES!!!
                        </Typography>
                            <div className="container-fluid">
                                <div className="row">
                                    {foodItems.map((item, index)=>{
                                      return (
                                      <React.Fragment>
                                            <div className=" col-md-4 col-lg my-3 mx-3 ">
                                                <div className="card" style={{width:"16rem"}} >
                                                  <div className="card m-1">
                                                  <div className={classes.imageSizing} >
                                                      <img src={item.img}  className="card-img-top" alt="..." />
                                                  </div>
                                                  </div>

                                                  <div className="card-body">
                                                    <h5 className="card-text"> {item.description} </h5>
                                                    <p className="card-title"> {item.price} </p>
                                                  </div>
                                                </div>
                                            </div>
                                      </React.Fragment>)
                                    })}
                                </div>
                            </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div className="container-fluid">
                          <div className="row">
                              {ProductItems.map((item, index)=>{
                                return (
                                <React.Fragment>
                                      <div className=" col-md-4 col-lg my-3 mx-3 ">
                                           <div className="card" style={{width:"16rem"}} >
                                              {/* <div className={classes.container}>
                                                <h5 className={classes.topRight} style={{backgroundColor:'red'}}> {item.bestSeller} </h5>
                                              </div> */}
                                              <div className="card m-1">
                                              <div className={classes.imageSizing} >
                                                  <img src={item.img}  className="card-img-top" alt="..." />
                                              </div>
                                              </div>

                                              <div className="card-body">
                                                <h5 className="card-text"> {item.description} </h5>
                                                <p className="card-title"> {item.price} </p>
                                              </div>
                                          </div>
                              
                                      </div>
                                </React.Fragment>)
                              })}
                          </div>
                      </div>
                    </Grid>
                </Grid>
            </Container>  
        </React.Fragment>
    )
}

import React,{useEffect,useState} from 'react'
import {Container,Row, Col, Card, Modal} from "react-bootstrap"
import homeImage from "../assets//images.PNG";
import {useDispatch,useSelector} from 'react-redux'
import AllProducts from './Allproducts'
import {  getAllProduct as getAllProducts} from "../../actions/productActions";

export default function Home() {

  const [show, setShow ] =  useState(false)
  const dispatch = useDispatch()
  const state = useSelector(state=>({
      allProducts: state.productReducer.allProducts,
    //   products:state.productReducer.products
    }))
    
  useEffect(() => {
      dispatch(getAllProducts())
    }, [dispatch]);

  const {allProducts} = state

  const productHotSale = allProducts.filter(item=>item.hotSale===1).slice(0,3)
  // console.log(productHotSale)

  const handleClose = () =>  setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <React.Fragment>
      <Container fluid className="pt-1 position-relative">
        <img src={homeImage} className="img-fluid homeImageSizing" style={{width:"100%", height:'800px',backgroundSize:'cover'}} alt="Home page"/>
        <div className="bottomleft"style={{backgroundColor:'#BC1F27', color:'#fff'}} >SHOP NOW</div>
      </Container> 
      <Container fluid className="pt-5 pb-5 groceries">
          <Row>
              <Col md={6}>
                  <h3>About the eCommerce website</h3>
                  <h5>Groceries</h5>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Laudantium quae nostrum voluptas quisquam rerum ullam 
                      provident facere, tempore quod sed fuga obcaecati alias 
                      explicabo perspiciatis placeat quo. Reiciendis, voluptatum 
                      mollitia! Lorem ipsum dolor sit amet consectetur adipisicing 
                      elit. Sequi, qui. Est voluptatum quibusdam harum nulla!
                      Reiciendis, voluptatum mollitia! Lorem ipsum dolor sit 
                      amet consectetur adipisicing elit. Sequi, qui. Est voluptatum 
                      quibusdam harum nulla!. Sequi, qui. Est voluptatum quibusdam harum nulla!
                      Reiciendis, voluptatum mollitia! 
                  </p>
              </Col>
              <Col md={6} id="productHotSale">
                  <h3 className="text-uppercase hotSales">Hot Sales!!!</h3>
                  <div className="container-fluid">
                      <div className="row">
                          {productHotSale.map(item=>{
                              return(
                                  <React.Fragment key={item._id} >
                                      <div className="col-6 col-md-6 col-lg-4 col-sm-6 p-1"  onClick={handleShow}>
                                          <Card className="p-2 cardBody">
                                              <Card className="p-3">
                                                  <Card.Img variant="top" className="hotSaleImage" src={item.productImageUrl} />
                                              </Card>
                                              <Card.Body>
                                                  <h6> {item.productDescription}</h6>
                                                  <h4 ># {item.productPrice}</h4>
                                              </Card.Body>
                                          </Card>
                                      </div>
                                      <Modal show={show} onHide={handleClose} size="lg">
                                          <Modal.Header closeButton>
                                              <Modal.Title >Product Details</Modal.Title>
                                          </Modal.Header>
                                          <Modal.Body>
                                              <Container>
                                                  <Row className="pb-4">
                                                      <Col md={4}>
                                                          <img className="imageDetails img-fluid" src={item.productImageUrl} alt=""/> 
                                                      </Col>
                                                      <Col md={8}>
                                                          <h6> {item.productDescription}</h6>
                                                          <button style={{border:"none", marginRight:'5px'}}>category not available</button>
                                                          <h4 ># {item.productPrice}</h4>
                                                      </Col> 
                                                  </Row>
                                                  <Row>
                                                      <Col md={12}>
                                                        <div>
                                                          <h3>Product Description</h3>
                                                          <hr className="horizontalLines"/>
                                                          <h6> {item.productDescription}</h6>
                                                        </div>
                                                      </Col>
                                                  </Row>
                                                  <Row>
                                                      <Col md={12}>
                                                        <div>
                                                          <h3>Seller Information</h3>
                                                          <hr className="horizontalLines"/>
                                                          <h6> {item.productDescription}</h6>
                                                          {/* <h6> {item.user.contactInfo.address}</h6> */}
                                                        </div> 
                                                      </Col>
                                                  </Row>
                                              </Container>
                                          </Modal.Body>
                                      </Modal>
                                  </React.Fragment>
                              )
                          })}
                      </div>
                  </div>
              </Col>   
          </Row>
          <hr  />
          <AllProducts />
      </Container>
    </React.Fragment>
  )
}

import React, {useEffect, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { getAllProduct } from "../../actions/productActions";
import {Container,Row, Card, Modal,Col} from "react-bootstrap"
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ReactPaginate from "react-paginate"
import SwapVertIcon from '@material-ui/icons/SwapVert';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import CustomSorting from "../FormFields/CustomSorting";

const Allproducts =(props)=> {

    const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    const state = useSelector(state=>({
        allProducts: state.productReducer.allProducts,
        }))

    // pagination
    const [pageNumber, setPageNumber] = useState(0)

    const productPerPage = 8
    const pagesVisited = pageNumber * productPerPage                        
     
    useEffect(() => {
        dispatch(getAllProduct())
        }, [dispatch]);


    const {allProducts} = state

    // console.log('Product', products);
    // const productId = products.map(item=>item.user._id).slice(0, 1)
    // console.log('Ids', productId);

    // const fetchProductDetails = async()=>{
    //     try{
    //         const fetchProduct = await axiosClient.get(`${url}/${productId}`)
    //         setProductDetails(fetchProduct.data.data)
    //         console.log(fetchProduct.data.data);
    //     }catch(err){
    //         const error = err.response.data
    //         console.log(error);
    //     }
    // }

    // Testing ends here 

    const handleClose = () => setShow(false);
    const handleShow = () =>{
        setShow(true);
        // fetchProductDetails()
    } 

    const displayProduct = allProducts.slice(pagesVisited, pagesVisited + productPerPage)
    const pageCount = Math.ceil(allProducts.length / productPerPage)
    const changePage =({selected}) =>{
        setPageNumber(selected)
    }

    // sorting
    const {items, requestSort, sortConfig} = CustomSorting(displayProduct)
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
          return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };
    //sorting ends here

    // console.log(allProducts);

    return (
        <React.Fragment>
            <Container fluid className="pt-5 pb-5">
                <div>
                    <div className="row">
                        <div className="col-6 col-md-6">
                            <h2 className="catalog" >Product Catalog</h2>
                        </div>
                        <div className="col-1 col-md-3"></div>
                        <div className="col-1 col-md-2">
                            <div style={{display:'flex',width:'100%', justifyContent:"flex-end", paddingTop:"12px"}}> 
                                <span style={{fontSize:20, fontWeight:'lighter', paddingRight:'10px'}}> <SwapVertIcon />Sort </span>
                            </div>
                        </div>
                        <div className="col-1 col-md-1 mt-0">
                            <div className="dropdown">
                                <button className="dropbtn"><KeyboardArrowDownIcon /></button>
                                <div className="dropdown-content">
                                    <button onClick={()=>requestSort('productName')} className={getClassNamesFor('productName')} >Name</button>
                                    <button onClick={()=>requestSort('createdAt')} className={getClassNamesFor('createdAt')} >CreatedAt</button>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-md-1"> 
                        </div> */}    
                    </div> 
                    <hr color="#00CCFF" />
                </div>
                <Row>
                    {items.map(item=>{
                        if(item.bestSeller){
                            return(
                                <React.Fragment key={item._id}>
                                    <div className="col-6 mx-auto col-md-6 col-lg-3 col-sm-6 my-2" onClick={handleShow}>
                                        <Card className="p-2 cardBodyHotSale">
                                            <Card className="p-3">
                                                <Card.Img variant="top" src={item.productImageUrl} className="imageSizing position-relative" />
                                                <h2 ><span className="position-absolute best-seller" style={{ backgroundColor:'#BC1F27', color:"#fff", float:'right', right:'16px', top:"0px",padding:"7px"}}> Best Seller </span> </h2>
                                            </Card>
                                            <Card.Body>
                                                <h6 className="description"> {item.productDescription}</h6>
                                                <h4> # {item.productPrice} </h4>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                    <Modal show={show} onHide={handleClose} size="lg">
                                        <Modal.Header closeButton>
                                            <Modal.Title>Product Details</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Container >
                                                    <Row className="pb-4">
                                                    <Col md={4} >
                                                        <img style={{borderStyle:'groove'}} className="imageDetails img-fluid" src={item.productImageUrl} alt=""/> 
                                                    </Col>
                                                    <Col md={8}>
                                                        <h6>{item.productDescription}</h6>
                                                        <button style={{border:"none", marginRight:'5px'}}>category not available</button>       
                                                        <h4 ># {item.productPrice}</h4>
                                                    </Col> 
                                                </Row>
                                                <Row>
                                                    <Col md={12}>
                                                        <div className="pb-3">
                                                            <h3>Product Description</h3>
                                                            <hr className="horizontalLines"/>
                                                            <h6> {item.productDescription}</h6>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={12}>
                                                        <div >
                                                            <h3>Seller Information</h3>
                                                            <hr className="horizontalLines"/>
                                                            <p>Not available</p>
                                                        </div>
                                                    </Col>
                                                    <Col md={12}>
                                                        {/* <h4 className="detailsText"> {item.user.name}</h4>   */}
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Modal.Body>
                                    </Modal>
                                </React.Fragment>  
                            )
                        }else{
                            return(
                            <React.Fragment key={item._id}>
                                <div className="col-6 mx-auto col-md-6 col-lg-3 col-sm-6 my-2" onClick={handleShow} key={item._id} >
                                    <Card className="p-2 cardBody">
                                        <Card className="p-3">
                                            <Card.Img variant="top" src={item.productImageUrl} className="imageSizing" />
                                        </Card>
                                        <Card.Body>
                                            <h6> {item.productDescription} </h6>
                                            <h4> N {item.productPrice} </h4>
                                        </Card.Body>
                                    </Card>
                                </div>
                                {/* <Modal show={show} onHide={handleClose} size="lg">
                                    <Modal.Header closeButton>
                                        <Modal.Title>Product Details</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Container>
                                            <Row className="pb-4">
                                                <Col md={4}>
                                                    <img className="imageDetails img-fluid" src={item.productImageUrl} alt=""/> 
                                                </Col>
                                                <Col md={8}>
                                                    <h6> {item.productDescription}</h6>
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
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Container> 
                                    </Modal.Body>
                                </Modal> */}
                            </React.Fragment>  
                        ) 
                        }
                    })}
                </Row>
                <ReactPaginate 
                    previousLabel={<SkipNextIcon style={{fontSize:20}}/>}
                    nextLabel={<SkipNextIcon style={{fontSize:20}}  />}
                    pageCount={pageCount} 
                    onPageChange={changePage}
                    containerClassName={"paginationButton"} 
                    previousLinkClassName={"previousButton"}
                    nextLinkClassName={"nextButton"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                />
            </Container>
        </React.Fragment>
    )
}
export default Allproducts
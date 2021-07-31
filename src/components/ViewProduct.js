import React from 'react'
import image from "../components/assets/home-min.jpg";
import img_1 from "../components/assets/rice.jpg";
import img_2 from "../components/assets/oil.jpg";
import img_3 from "../components/assets/pepsi.jpg";
import img_4 from '../components/assets/milo.jpg'

const ProductItems=[
  {img:img_1, description:'50kg of Amanda Rice', price:'#5,000'},
  {img:img_2, description:'5kg of Royal Oil', price:'#2,000'},
  {img:img_3, description:'5 cans of pepsi', price:'#1,500'},
  {img:img_4, description:'20kg can of milo', price:'#9,500'},
]

const ViewProduct=()=>{

    return(
        <React.Fragment>
            <div className="container">
                <div className="row">
                  {ProductItems.map((item, index)=>{
                      return (
                      <React.Fragment>
                            <div className="col-sm-4 col-md-4 col-lg-3 my-3 mx-2" key={index}>
                                <div className="card " style={{width: '18rem'}} >
                                  <div className="card m-1">
                                      <img src={item.img}  className="card-img-top" alt="..." />
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
        </React.Fragment>
    )
}

export default ViewProduct
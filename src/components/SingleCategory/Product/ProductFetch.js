import React, { useState } from 'react'
import { httpClient } from "../../../utils/Config";
const url= "/product"

const ProductFetch=()=>{

    const [products, setProducts] = useState([])
  
const getProduct =async()=>{
    try{
        const getAllProduct = await httpClient.get(url)
        setProducts(getAllProduct.data.data)

    }
    catch(err){
        console.log(err.response);
        
    }
}

const deletAProduct=async(id)=>{
    try{
        await httpClient.delete(url/`${id}`)
        getProduct()
    }
    catch(error){
        console.log(error.response);
        
    }
}

}

export default ProductFetch
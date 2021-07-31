import {GET_ALL_PRODUCT, DELETE_PRODUCT, GET_PRODUCT,POST_PRODUCT } from "./type";
import { httpClient,axiosClient } from "../utils/Config";
import {toastr} from 'react-redux-toastr'
import {reactReduxToastrOptions} from "../utils/Constant"

// const url= "https://etranzact-test-api.herokuapp.com/api/etz/product"


export const getAllProduct = () => async dispatch=>{
    const url = '/product/all'
    const config = {
        headers:{
            'Content-Type':'application/json',
            'dataType':'text/html',
            "Accept": 'text/html',
        }
    }
    try {
        const res = await axiosClient.get(url, config)
        dispatch({
            type:GET_ALL_PRODUCT,
            payload:res.data.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const postProduct = (data) => async dispatch =>{
    const url = "/product"
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    try{
        const res = await httpClient.post(url,data,config)
        dispatch({
            type:POST_PRODUCT,
            payload:res.data
        })
       toastr.success('Product created successfully', `${res.data.message}`,reactReduxToastrOptions("top-right"))
    }
    catch (err) {
        const errors = err.response.data
        
        let productErrors = []
        errors!==null&&errors!==undefined&&Object.values(errors).forEach(value=>{
            productErrors.push(value)
        })
        productErrors.length>0&&productErrors!==null&&productErrors!==undefined&&productErrors.map(item=>(
            toastr.error(`${item}`,reactReduxToastrOptions("top-right"))
        ))
    }
}

export const getProduct = () =>async dispatch =>{
    const url="/product"
    try{
        const res = await httpClient.get(url)
        dispatch({
        type:GET_PRODUCT,
        payload:res.data.data
    })
    }catch (err) {
       const error = err.response.data
       console.log(error);
       
    }        
}

export const deleteProduct =(id)=>dispatch=>{
    const url="/product"
    httpClient.delete(`${url}/${id}`)
    .then(res=>
        ({
            type:DELETE_PRODUCT,
            payload:id
        })
    )
}
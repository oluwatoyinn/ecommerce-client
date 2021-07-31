import { GET_CATEGORY, POST_CATEGORY,UPDATE_CATEGORY, DELETE_CATEGORY } from "./type";
import { httpClient } from "../utils/Config";
import {toastr} from 'react-redux-toastr'
import {reactReduxToastrOptions} from "../utils/Constant"
// import { setAlert } from './alert';


export const getCategory =()=>async dispatch=>{
        const res = await httpClient.get('/category')
        dispatch({
        type:GET_CATEGORY,
        payload:res.data.data
    })   
}


export const postCategory = (data) => async dispatch =>{
    const url = "/category"
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    try{
        const res = await httpClient.post(url,data,config)
        dispatch({
            type:POST_CATEGORY,
            payload:res.data
        })
       toastr.success('Created successfully', `${res.data.message}`,reactReduxToastrOptions("top-right"))
    }
    catch (err) {
        const errors = err.response.data
        console.log(errors)
    }
}

export const deleteCategory =(id)=>async dispatch=>{
    const url="/category"
    await httpClient.delete(`${url}/${id}`)
    .then(res=>
        ({
            type:DELETE_CATEGORY,
            payload:id
        })
    )
    toastr.warning('Category deleted',reactReduxToastrOptions("top-right"))
}

export const updateCategory =(data,id)=>dispatch=>{
    httpClient.put(`/category/${id}`, data)
    .then(res=>
        ({
            type:UPDATE_CATEGORY,
            payload:res.data.data
        })    
    )
    // toastr.success('Updated Successfully', `${res.data.message}`,reactReduxToastrOptions("top-right"))
}



// export const postCategory = (data) => async dispatch =>{
//     const config = {
//         headers:{
//             'Content-Type':'application/json'
//         }
//     }
//     try{
//         const res=await axios.post(url,data, config)
//         const {access_token} = res.data

//         localStorage.getItem("jwt_token",res.data.token)
//         setAuthenticatedToken(res.data.token)

//         dispatch({
//             type:POST_CATEGORY,
//             payload:access_token 
//         })
//     }
//     catch (error) {
//         console.log(error)
//     }
// }
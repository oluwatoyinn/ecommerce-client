import { axiosClient } from "../utils/Config";
import * as type from "./type";
import setAuthenticatedToken  from "../utils/SetAuthenticatedToken";
import {toastr} from 'react-redux-toastr'
import {reactReduxToastrOptions} from "../utils/Constant"
// import { setAlert } from './alert';

const url = "/user/login"

export const login = (data, history) => async dispatch =>{
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    try{
        const res = await axiosClient.post(url,data, config)
        // const {access_token} = res.data
        localStorage.setItem("jwt_token", res.data.token)
        setAuthenticatedToken(res.data.token)
        dispatch({
            type:type.LOGIN,
            payload:res.data.token 
        })
       toastr.success('Login Successfully', `${res.data.message}`,reactReduxToastrOptions("top-right"))
    }
    catch (err) {
        const errors = err.response.data
        // console.log(errors);

        let logErros =[]
        errors!==null&&errors!==undefined&&Object.values(errors).forEach(value=>{
            logErros.push(value)
        })
        logErros.length>0&&logErros!==null&&logErros!==undefined&&logErros.map(item=>(
            toastr.error('User not find! Please sign up', `${item}`,reactReduxToastrOptions("top-right"))
        ))
        
    }
}

export const register =(data,history) =>async dispatch =>{ 
    const url = "/user/register"
    const config = {
        headers:{
            'content-Type':'application/json'
        }
    }
    try {
        const res = await axiosClient.post(url,data,config)
        // console.log(res);
        dispatch({
            type:type.REGISTER,
            payload:res.data.data
        })
       history.push('/home')
       toastr.success('Registration Successfull', `${res.data.message}`,reactReduxToastrOptions("top-right"))
    } catch (err){
        const errors = err.response.data;

        let regErrors = [];
        errors!==null&&errors!==undefined&&Object.values(errors).forEach((value) => (
            regErrors.push(value)
        ));
    
        regErrors.length>0&&regErrors!==null&&regErrors!==undefined&&regErrors.map((item, i) => (
            toastr.error(`${item}`,reactReduxToastrOptions("top-right"))
        ))
    } 
}


export const logout = ()=> dispatch => {
    
    localStorage.removeItem("jwt_token")
    
    setAuthenticatedToken(false)
    dispatch({
        type:type.LOGOUT
    })
}



















// function userLogin(email, password) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//     };

//     return axiosClient.post(url, requestOptions)
//         .then(response => {
//             if (!response.ok) { 
//                 return Promise.reject(response.statusText);
//             }

//             return response.json();
//         })
//         .then(user => {
//             // login successful if there's a jwt token in the response
//             if (user && user.token) {
//                 // store user details and jwt token in local storage to keep user logged in between page refreshes
//                 localStorage.setItem('user', JSON.stringify(user));
//             }

//             return user;
  
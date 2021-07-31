import {combineReducers} from 'redux'
import authenticationReducer  from "./authenticationReducer";
import categoryReducers from "./categoryReducers";
import productReducer from "./productReducer";
import {reducer as ToastrReducer} from 'react-redux-toastr'


// import  authentication  from "./authenticationReducer";

export default combineReducers({ 
   authenticationReducer,
   categoryReducers,
   productReducer,
   toastr:ToastrReducer, 
})
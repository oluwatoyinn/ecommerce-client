import {GET_ALL_PRODUCT, GET_PRODUCT} from '../actions/type'

const initialState={
    products:[],
    allProducts:[],
    // product:{},
}

export default function funtionName (state=initialState, action){
    const {payload,type} = action
    switch(type){
        case GET_PRODUCT:
            return{
                ...state,
                products:payload,
            }
        case GET_ALL_PRODUCT:
            return{
                ...state,
                allProducts:payload,
            }
        default:
            return state;
    }
}
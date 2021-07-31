import {GET_CATEGORY} from '../actions/type'

const initialState={
    categories:[],
    category:{},

}

export default function funtionName (state=initialState, action){
    switch(action.type){
        case GET_CATEGORY:
            return{
                ...state,
                categories:action.payload,
            }
        default:
            return state;
    }
}
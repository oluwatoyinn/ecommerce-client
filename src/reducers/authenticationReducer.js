import { LOGIN, REGISTER, LOGOUT } from "../actions/type";

const initialState = {
    token: localStorage.getItem('jwt_token'),
    isAuthenticated:false,
    user:null,
    isLoading:false,
    // showPassword:false
}

const checkTokenExist = (payload) => {
    if(payload){
        return true
    } else {
        return false
    }
}

export default function funtionName(state=initialState,action){
    const {payload,type} = action
    switch(type){
        case LOGIN:
            return {
                ...state,
                isAuthenticated:checkTokenExist(payload),
                isLoading:true
            }
        case REGISTER:
            return {
                ...state,
                user:payload,
            }
        case LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,   
            };
        default:
            return state
            
    }
}

// let user = JSON.parse(localStorage.getItem('user'));
// const initialState = user ? { loggedIn: true, user } : {};

// export default function authentication(state = initialState, action) {
//     switch (action.type) {
//       case LOGIN:
//         return {
//           loggingIn: true,
//           user: action.user
//         };
//       case LOGOUT:
//         return {};
//       default:
//         return state
//     }
//   }
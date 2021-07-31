import axios from 'axios'

const baseURL = "https://etranzact-test-api.herokuapp.com/api/etz"


const httpTimeout = '50000'

export const axiosClient = axios.create({
    baseURL:baseURL,
    timeout:httpTimeout,
    headers: {
        "Content-Type": "application/json"
      }
})

export const httpClient = axios.create({
  baseURL:baseURL,
  timeout:httpTimeout,
    headers: {
        "Content-Type": "application/json"
     }
});

httpClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem('jwt_token');
  config.headers.Authorization =  token ? `Bearer ${token}` : '';
  return config;
});



// axios.interceptors.request.use(
//   async (config)=>{
//     // const token = localStorage.getItem()
//       if(token!==null && token!==undefined){
//         config.headers.Authorization=token? `Bearer ${token}`:" ";
//         return config;
//       }
//       return config;
//   },
//   (err)=>{
//     return Promise.reject(err);
//   }
// )
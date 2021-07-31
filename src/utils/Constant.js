export const reactReduxToastrOptions=(position="top-right")=>{ 
    const options = {
         position:position
     }
     return options
 } 
 
 export const delay = (ms)=> new Promise(resolve=> setTimeout(resolve,ms))
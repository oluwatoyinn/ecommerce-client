import React from 'react';
import Loader from 'react-loader-spinner';


const MyLoader = ({msg}) => (
    
        <div style={fontStyle}>
            <Loader type="Oval" color="#007bff" height={80} width={50} />
            <div className="" style={{fontSize: '16px',marginLeft:'-10px'}}>
                {msg}
            </div>
        </div>
       

);


const fontStyle = {

    position: 'absolute', 
    left: '50%', 
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex:2,
    background:'transparent',

}

export default MyLoader;
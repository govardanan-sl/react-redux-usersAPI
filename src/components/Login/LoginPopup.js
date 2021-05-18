import React, { useState } from 'react'
import { connect } from 'react-redux';
import Button from '../Form/Button';
import Popup from '../Form/Popup'
import Login from './Login'
import Register from './Register';

function LoginPopup(props) {
    const {openPopup , setOpenPopup} = props;
    const [isRegister,setIsRegister] = useState(false);
    return (
        <>
        {!props.accessToken&&!isRegister&&<Popup openPopup={openPopup} title="Login">
            <Login setPopup={setOpenPopup} setIsRegister={setIsRegister}/>
        </Popup>}
        {!props.accessToken&&isRegister&&<Popup openPopup={isRegister} setOpenPopup={setIsRegister} title="Register">
            <Register setPopup={setOpenPopup}/>
        </Popup>}
        </>
    )
}

const mapStateToProps = (state) =>{
    return{
        accessToken:state.accessToken
    }
}

export default connect(mapStateToProps,null)(LoginPopup)

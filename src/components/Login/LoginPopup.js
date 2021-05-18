import React, { useState } from 'react'
import { connect } from 'react-redux';
import Popup from '../Form/Popup'
import Login from './Login'

function LoginPopup(props) {
    const [openPopup , setOpenPopup] = useState(true);
    return (
        <>
        {!props.accessToken&&<Popup openPopup={openPopup} title="Login">
            <Login setPopup={setOpenPopup}/>
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

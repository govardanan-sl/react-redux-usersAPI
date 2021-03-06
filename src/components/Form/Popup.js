import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react'
import CloseIcon from '@material-ui/icons/Close';
import ActionButton from './ActionButton';


function Popup(props) {
    const {title,children,openPopup,setOpenPopup} = props;
    return (
        <Dialog open={openPopup} maxWidth="lg">
            <DialogTitle>
                <div style={{display:'flex',justifyContent:"space-between"}}>
                    {title}
                    <ActionButton color="secondary" onClick={()=>setOpenPopup&&setOpenPopup(false)}><CloseIcon></CloseIcon></ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <div>{children}</div>
            </DialogContent>
        </Dialog>
    )
}

export default Popup

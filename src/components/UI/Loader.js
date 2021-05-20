import { Backdrop, CircularProgress } from '@material-ui/core'
import React from 'react'

function Loader(props) {
    const {isOpen,children} = props;
    return (
        <Backdrop open={isOpen} style={{zIndex:1}}>
            <CircularProgress/>
            {children}
        </Backdrop>
    )
}

export default Loader;

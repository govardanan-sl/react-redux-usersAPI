import React from 'react'
import {Button as MButton} from '@material-ui/core'

function Button(props) {

    const {text,size,color,variant,onClick, ...other} = props

    return (
        <MButton style={{margin:'8px'}}
            variant={ variant || "contained" }
            size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            {...other}
        >
            {text}
        </MButton>
    )
}

export default Button

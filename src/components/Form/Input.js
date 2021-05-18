import { TextField } from '@material-ui/core';
import React from 'react'

function Input(props) {
    const {name,label,value,onChange,...others} = props;
    return (
        <TextField 
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange = {onChange}
            {...others}
        />
    )
}

export default Input

import { TextField } from '@material-ui/core';
import React from 'react'

function Input(props) {
    const {name,label,value,onChange,error=null} = props;
    return (
        <TextField 
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange = {onChange}
            {...(error&&{error:true,helperText:error})}
        />
    )
}

export default Input

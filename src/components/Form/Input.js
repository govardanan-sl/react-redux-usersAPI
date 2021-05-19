import { TextField } from '@material-ui/core';
import React from 'react'

function Input(props) {
    const {name,label,value,onChange,error=null,...others} = props;
    return (
        <TextField
            data-testid="InputField" 
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange = {onChange}
            placeholder={label}
            {...(error&&{error:true,helperText:error})}
            {...others}
        />
    )
}

export default Input

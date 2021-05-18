import { FormControl, InputLabel, MenuItem, Select as MSelect } from '@material-ui/core'
import React from 'react'

function Select(props) {

    const {name,label,value,onChange,options} = props

    return (
        <FormControl variant="outlined">
            <InputLabel>{label}</InputLabel>
            <MSelect
                name={name}
                label={label}
                value={value}
                onChange={onChange}
            >
                <MenuItem value="">None</MenuItem>
                {
                    options.map((item)=>(
                        <MenuItem value={item.title} key={item.id}>{item.title}</MenuItem>
                    ))
                }
            </MSelect>
        </FormControl>
    )
}

export default Select

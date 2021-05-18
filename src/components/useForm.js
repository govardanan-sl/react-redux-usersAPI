import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
export const useForm = (initialValues) => {
    const [formData,setFormData]= useState(initialValues);
    const handleInputChange = e =>{
        const {name,value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    }
    return (
        formData,
        setFormData,
        handleInputChange
    )
}

const useStyle = makeStyles(theme=>({
    root:{
        '& .MuiFormControl-root':{
            width:'80%',
            margin:theme.spacing(1)
        }
    }
}))



export function Form(props) {
    const classes = useStyle();
    return (
        <form className={classes.root} autoComplete="off">
            {props.children}
        </form>
    )
}






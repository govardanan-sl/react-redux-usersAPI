import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
export const useForm = (initialValues) => {
    const [formData,setFormData]= useState(initialValues);
    const [error,setError] = useState({});
    const handleInputChange = e =>{
        const {name,value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    }
    const resetForm = () =>{
        setFormData(initialValues);
    }
    return {
        formData,
        setFormData,
        handleInputChange,
        error,
        setError,
        resetForm
    }
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
        <form className={classes.root} autoComplete="off" onSubmit={props.onSubmit}>
            {props.children}
        </form>
    )
}






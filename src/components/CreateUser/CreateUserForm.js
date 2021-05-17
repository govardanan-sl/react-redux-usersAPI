import { Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import useStyle from './Style'

const initialValues ={
    name: "",
    job: ""
}


function CreateUserForm() {
    const [formData,setFormData]= useState(initialValues);
    const classes = useStyle();
    return (
        <form className={classes.root}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField 
                        variant="outlined"
                        label="Name"
                        value={formData.name}
                    />
                    <TextField 
                        variant="outlined"
                        label="Job Role"
                        value={formData.job}
                    />
                </Grid>
                <Grid item xs={6}></Grid>
            </Grid>
        </form>
    )
}

export default CreateUserForm;

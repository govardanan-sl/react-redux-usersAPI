import { Grid, TextField } from '@material-ui/core';
import React from 'react'
import {useForm,Form} from '../useForm';

const initialValues ={
    name:'',
    job: ''
}


function CreateUserForm() {
    const { formData , handleInputChange} = useForm(initialValues);
    return (
        <Form>
            <Grid container>
                <Grid item xs={6}>
                    <TextField 
                        variant="outlined"
                        label="Name"
                        name="name"
                        value={formData&&formData.name}
                        onChange = {handleInputChange}
                    />
                    <TextField 
                        variant="outlined"
                        label="Job Role"
                        name="job"
                        value={formData&&formData.job}
                        onChange = {handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}></Grid>
            </Grid>
        </Form>
    )
}

export default CreateUserForm;

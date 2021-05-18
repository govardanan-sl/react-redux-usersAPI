import { Grid } from '@material-ui/core';
import React from 'react'
import {useForm,Form} from '../useForm';
import Input from '../Form/Input';
import Select from '../Form/Select';
import { getJobRoles } from './JobRoles';
import Button from '../Form/Button';
const initialValues ={
    name:'',
    job: ''
}


function CreateUserForm() {
    const { formData , handleInputChange} = useForm(initialValues);
    return (
        <Form>
            <Grid container>
                <Grid item xs={4}>
                   <Input
                        label="Name"
                        name="name"
                        value={formData?.name}
                        onChange={handleInputChange}
                    />
                    <Select 
                        name="Job Role"
                        label="Job Role"
                        value={formData?.job}
                        onChange={handleInputChange}
                        options = {getJobRoles()}
                    />
                     <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        text="Submit"
                        type="submit"
                    ></Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        text="Reset"
                        type="reset"
                    ></Button>
                </Grid>
            </Grid>
        </Form>
    )
}

export default CreateUserForm;

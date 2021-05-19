import { Grid } from '@material-ui/core';
import React, { useState } from 'react'
import {useForm,Form} from '../useForm';
import Input from '../Form/Input';
import Select from '../Form/Select';
import { getJobRoles } from './JobRoles';
import Button from '../Form/Button';
import { Alert } from '@material-ui/lab';
const initialValues ={
    name:'',
    job: ''
}


function CreateUserForm() {
    const { formData , handleInputChange, setError,error,resetForm} = useForm(initialValues);
    const [isPending , setIsPending] = useState(false);
    const [isError,setIsError] = useState(null);
    const [successText,setSuccessText] = useState(null);
    const validate = () =>{
        let temp = {}
        temp.name = formData.name?"":"Required"
        temp.job= formData.job?"":"Required"
        setError({...temp});
        return Object.values(temp).every(x => x==="");
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(validate()){
            const post = { name:formData.name, job:formData.job};
            console.log(JSON.stringify(post));
            setIsPending(true);
            var createPostHeader = new Headers();
            createPostHeader.append("Content-Type", "application/json");
            let requestOptions = {
                method: 'POST',
                headers: createPostHeader,
                body : JSON.stringify(post)
            };
            let url = "https://reqres.in/api/users"
            fetch(url, requestOptions)
            .then((res) => {
                  if(res.status!==201){
                    throw Error(res.statusText);
                }else{
                    console.log("Posted");
                    setIsPending(false);
                    setSuccessText("Created Successfully",setTimeout(() => {
                        setSuccessText(null);
                    }, 3000));
                    resetForm();
                }
            })
            .catch((err) => {
                console.log(err.message);
                setIsError(err.message);
                setIsPending(false);
            });
        }
    }
    return (
        <>
        {<Form onSubmit = {handleSubmit} data-test-id="CreateUserForm">
            <Grid container>
                <Grid item xs={6} style={{flexBasis:'100%',maxWidth:'100%'}}>
                   <Input
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        error={error.name}
                    />
                    <Select 
                        name="job"
                        label="Job Role"
                        value={formData.job}
                        onChange={handleInputChange}
                        options = {getJobRoles()}
                        error={error.job}
                    />
                     {!isPending&&
                     <div>
                     <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        text="Submit"
                        type="submit"
                    ></Button>
                    <Button
                        data-testid="resetButton"
                        variant="contained"
                        color="secondary"
                        size="large"
                        text="Reset"
                        onClick={resetForm}
                    ></Button></div>}
                    {isPending&&<p>Please Wait!!</p>}
                    {isError&&<p>{isError}</p>}
                </Grid>
            </Grid>
        </Form>}
        {successText&&<Alert severity="success" onClose={() => {setSuccessText(null)}}>Created New User Successfully!</Alert>}
        </>
    )
}

export default CreateUserForm;

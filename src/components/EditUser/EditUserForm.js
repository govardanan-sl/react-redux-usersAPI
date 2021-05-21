import { Avatar, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import {useForm,Form} from '../useForm';
import Input from '../Form/Input';
import Button from '../Form/Button';
import { Alert } from '@material-ui/lab';
import { fetchData } from '../../Api/FetchData';
import Loader from '../UI/Loader';
import { customTimeout } from '../../Utils/CustomTimeout';


function EditUserForm({initialValues,updateData,data}) {
    const { formData , handleInputChange, setError,error} = useForm(initialValues);
    const [isPending , setIsPending] = useState(false);
    const [isError,setIsError] = useState(null);
    const [successText,setSuccessText] = useState(null);
    let Ttimer;
    const validate = () =>{
        let temp = {}
        temp.name = formData.first_name?"":"Required"
        temp.last_name= formData.last_name?"":"Required"
        setError({...temp});
        return Object.values(temp).every(x => x==="");
    }
    useEffect(() => {
        return () => {
            clearInterval(Ttimer);
        }
    })
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(validate()){
            const post = { id:formData.id, email:formData.email,first_name:formData.first_name, last_name:formData.last_name, avatar:formData.avatar  };
            setIsPending(true);
            var createPostHeader = new Headers();
            createPostHeader.append("Content-Type", "application/json");
            let requestOptions = {
                method: 'PUT',
                headers: createPostHeader,
                body : JSON.stringify(post)
            };
            let url = "https://reqres.in/api/users/"+formData.id;
            Ttimer = ()=> customTimeout(3000,()=>setSuccessText(null));
            fetchData(url,requestOptions,setIsError)
            .then(res=>{
                setSuccessText(`${post.first_name} ${post.last_name} Updated Successfully`,Ttimer());
                setIsPending(false);
                let newdata  = data.filter((item)=>item.id!==formData.id)
                newdata.push(post);
                updateData(newdata);
            })
            .catch(err=>{
                console.log(err.message);
                setIsError(err.message);
                setIsPending(false);
            });
        }
    }
    return (
        <>
        {<Form onSubmit = {handleSubmit}>
            <Grid container>
                <Grid item xs={6} style={{flexBasis:'100%',maxWidth:'100%'}}>
                   <Avatar alt={formData.first_name} src={formData.avatar} style={{margin:'16px'}}/>
                   <Input
                        label="First Name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        error={error.name}
                    />
                    <Input
                        label="Last Name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        error={error.last_name}
                    />
                    <Input
                        disabled
                        label="Email"
                        name="email"
                        value={formData.email}
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
                    </div>}
                    {<Loader isOpen={isPending}/>}
                    {isError&&<Alert severity="error" onClose={() => {setIsError(null)}}>{isError}</Alert>}
                </Grid>
            </Grid>
        </Form>}
        {successText&&<Alert severity="success" onClose={() => {setSuccessText(null)}}>{successText}</Alert>}
        </>
    )
}

export default EditUserForm;

import { Avatar, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react'
import { connect } from 'react-redux';
import { setLoggedIn } from '../../Store/actions';
import Button from '../Form/Button';
import Input from '../Form/Input'
import { Form, useForm } from '../useForm';

const initialValues = {
    email:"",
    password:""
}

function Register(props) {
    const [isPending , setIsPending] = useState(false);
    const [isError,setIsError] = useState(null);
    const [successText,setSuccessText] = useState(null);
    const { formData , handleInputChange, setError,error,resetForm} = useForm(initialValues);
    const {setPopup} = props;
    const validate = () =>{
        let temp = {}
        temp.email = formData.email?"":"Required"
        temp.password= formData.password?"":"Required"
        setError({...temp});
        return Object.values(temp).every(x => x==="");
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(validate()){
            setIsPending(true);
            let requestOptions = {
                method: 'POST',
                headers: {"Content-Type" : "application/json"},
                body : JSON.stringify(formData)
            };
            let url = "https://reqres.in/api/Register"
            fetch(url, requestOptions)
            .then((res) => {
                if(res.status!==200){
                    throw Error("Invalid Username or password");
                }else{
                    console.log("Verified successfully");
                    return res.json();
                }
            })
            .then(result =>{
                console.log(result)
                const payload = {
                    accessToken:result.token,
                }
                setSuccessText("Registered Successfully");
                props.setLoginData(payload);
                console.log(result);
                setPopup(false);
            })
            .catch((err) => {
                setIsError(err.message)
                setIsPending(false);
            });
        }
    }
    return (
        <>
        {<Form onSubmit = {handleSubmit}>
            <Grid container>
                <Grid item xs={6} style={{flexBasis:'100%',maxWidth:'100%'}}>
                   <Input
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        type="email"
                        error={error.email}
                    />
                    <Input
                        label="password"
                        name="password"
                        type="password"
                        onChange={handleInputChange}
                        value={formData.password}
                        error={error.password}
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
                        variant="outlined"
                        color="text.secondary"
                        size="large"
                        text="reset"
                        onClick={()=>resetForm()}
                    />
                    </div>}
                    {isPending&&<p>Please Wait!!</p>}
                </Grid>
            </Grid>
        </Form>}
        {isError&&<Alert severity="warning" onClose={()=>{setError(null)}}>{isError}</Alert>}
        {successText&&<Alert severity="success" onClose={() => {setSuccessText(null)}}>{successText}</Alert>}
        </>
    )
}

const mapStateToProps = (state) =>{
    return{
        accessToken:state.accessToken
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        setLoginData:(payload)=>{
            dispatch(setLoggedIn(payload))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Register)

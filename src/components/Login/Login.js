import { Avatar, Grid, Tab, Tabs } from '@material-ui/core';
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

function Login(props) {
    const [isPending , setIsPending] = useState(false);
    const [isError,setIsError] = useState(null);
    const [successText,setSuccessText] = useState(null);
    const { formData , handleInputChange, setError,error,resetForm} = useForm(initialValues);
    const {setPopup} = props;
    const handleSubmit = (e) =>{
        e.preventDefault();
        setIsPending(true);
        let requestOptions = {
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body : JSON.stringify(formData)
        };
        let url = "https://reqres.in/api/login"
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
            setSuccessText("Logged In Successfully");
            props.setLoginData(payload);
            console.log(result);
            setPopup(false);
          })
          .catch((err) => {
            setIsError(err.message)
            setIsPending(false);
          });
    }
    return (
        <>
        {<Form onSubmit = {handleSubmit}>
            <Grid container>
                <Grid item xs={6} style={{flexBasis:'100%',maxWidth:'100%'}}>
                    <Grid>
                        <Avatar alt="User Image" style={{margin:'16px'}}/>
                   </Grid>
                   <Input
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        type="email"
                    />
                    <Input
                        label="password"
                        name="password"
                        type="password"
                        onChange={handleInputChange}
                        value={formData.password}
                        required
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

export default connect(mapStateToProps,mapDispatchToProps)(Login)

import React from 'react'

function Login() {
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
                        error={error.name}
                    />
                    <Input
                        disabled
                        label="Email"
                        name="email"
                        value={formData.email}
                        error={error.name}
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
                    {isError&&<p>{isError}</p>}
                </Grid>
            </Grid>
        </Form>}
        {successText&&<Alert severity="success" onClose={() => {setSuccessText(null)}}>{successText}</Alert>}
        </>
    )
}

export default Login

import { Avatar, Grid, LinearProgress, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar, Typography } from '@material-ui/core'
import { DeleteOutline, EditOutlined, PeopleOutlineTwoTone } from '@material-ui/icons'
import AddIcon from '@material-ui/icons/Add';
import { Alert, Pagination } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { fetchData } from '../../Api/FetchData';
import CreateUserForm from '../CreateUser/CreateUserForm';
import EditUserForm from '../EditUser/EditUserForm';
import ActionButton from '../Form/ActionButton';
import Button  from '../Form/Button'
import Popup from '../Form/Popup';
import PageHeader from '../Header/PageHeader'
import LoginPopup from '../Login/LoginPopup';
import {useTable} from '../useTable'



const useStyles = makeStyles(theme=>({
    pageContent:{
        margin:theme.spacing(5),
        padding:theme.spacing(3),
        overflow: "auto"
    }
}))

const headCells = [
    {id:'email',label:'Email'},
    {id:'fname',label:'First Name'},
    {id:'lname',label:'Last Name'},
    {id:'avatar',label:'Avatar'},
    {id:'actions',label:'Actions'}
]

let initialValues = {
    id:"",
    email:"",
    first_name:"",
    last_name:"",
    avatar:""
}

function DisplayUsers(props) {
    const classes = useStyles();
    const [data,setData] = useState()
    const [isError,setIsError] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const {TableContainer,TbleHead} = useTable(headCells);
    const [openPopup,setOpenPopup] = useState(false);
    const [pageNo,setPageNo] = useState(1);
    const [editData,setEditData] = useState(null);
    const [successMessage,setSuccessMessage] = useState(null);
    const [openLoginPopup,setLoginPopup] = useState(true);
    const getUserList = () =>{
        let url ="https://reqres.in/api/users?delay=1&page="+pageNo;
        setIsLoading(true)
        let homeHeaders = new Headers();
        let requestOptions= {
            method: 'GET',
            headers:homeHeaders,
            redirect: 'follow'
        };
        fetchData(url,requestOptions,setIsError)
        .then(res=>{
            setData(res.data);
            setIsLoading(false);
        })
        .catch(err=>{
            setIsError(err.message);
            setIsLoading(false);
        })
    }
    useEffect(() => {
        getUserList();
        /*fetch(url,requestOptions)
        .then(response => {
            if(response.status===401){
                return response.json();
            }
            if(!response.ok){
                throw Error("Could not Fetch data");
            }
            return response.json();
        })
        .then(result => {
            setData(result.data);
            setIsLoading(false);
            setIsError(false);
        })
        .catch(err=>{
            setIsError(err.message);
            setIsLoading(false);
        })*/
    },[pageNo]);
    const handlePageChange = (e,pageNo) =>{
        setPageNo(pageNo);
    }
    const handleEdit = (dt)=>{
        setEditData(dt);
        initialValues=dt;
    }
    const handleDelete = (id)=>{
        setIsLoading(true)
        let url ="https://reqres.in/api/users/"+id;
        let homeHeaders = new Headers();
        let requestOptions= {
            method: 'DELETE',
            headers:homeHeaders,
            redirect: 'follow'
        };
        fetch(url,requestOptions)
        .then(response => {
            if(response.status===204){
                setSuccessMessage("Deleted Successfully",setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000));
                let ndata=data.filter((element) => element.id!==id );
                setData(ndata);
                setIsLoading(false);
                setIsError(false);
            }
            if(!response.ok){
                throw Error("Could not Fetch data");
            }
        })
        .catch(err=>{
            setIsError(err.message);
            setIsLoading(false);
        })
        fetchData(url,requestOptions,setIsError)
        .then(res=>{
            console.log("Delete");
        })
        .catch(err=>{
            setIsError(err.message);
            setIsLoading(false);
        })
    }
    return (
        <div>
            <PageHeader
                title="All Users"
                subTitle="View and edit all the users" icon={<PeopleOutlineTwoTone fontSize="large"/>}/>
            {props.accessToken&&<Paper className={classes.pageContent}>
            {isError&&<Alert severity="warning" onClose={() => {setIsError(null)}}>{"Unable to Fetch Data"}</Alert>}
            {successMessage&&<Alert severity="success" onClose={() => {setSuccessMessage(null)}}>{successMessage}</Alert>}
                <Toolbar>
                    <Grid><Grid item  xs={10}></Grid></Grid>
                    <Button
                        onClick={()=>setOpenPopup(true)}
                        style={{right:'0'}}
                        text="ADD NEW"
                        variant="outlined"
                        color="secondary"
                        startIcon={<AddIcon/>}
                    />
                </Toolbar>
               {data&&<TableContainer>
                    <TbleHead/>
                    <TableBody>
                        {
                            data?.map(dt=>
                                (<TableRow key={dt.id}>
                                    <TableCell>{dt.email}</TableCell>
                                    <TableCell>{dt.first_name}</TableCell>
                                    <TableCell>{dt.last_name}</TableCell>
                                    <TableCell><Avatar alt={dt.first_name} src={dt.avatar} /></TableCell>
                                    <TableCell>
                                        {!isLoading&&<ActionButton color="primary" onClick={()=>{handleEdit(dt)}}>
                                            <EditOutlined></EditOutlined>
                                        </ActionButton>}
                                        {!isLoading&&<ActionButton color="secondary" onClick={()=>{handleDelete(dt.id)}}>
                                            <DeleteOutline></DeleteOutline>
                                        </ActionButton>}
                                    </TableCell>
                                </TableRow>))
                        }
                    </TableBody>
               </TableContainer>}
               {isLoading&&<LinearProgress/>}
               <Pagination count={2} variant="outlined" shape="rounded"  style={{marginTop: "16px"}} onChange={handlePageChange}/>
            </Paper>}
            {!props.accessToken&&
                <div>
                <Typography variant="h3" color="secondary" style={{textAlign:"center"}} role="loginMessage">
                    Login To View
                </Typography>
                <Button onClick={()=>{setLoginPopup(true)}} text="Login" color="secondary" style={{left: "47%",top: "25%"}}></Button>
                </div>
            }
            <Popup 
                title="Add New User"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <CreateUserForm/>
            </Popup>
            <Popup
                title="Edit User"
                openPopup={editData?true:false}
                setOpenPopup={setEditData}
            >
                {editData&&<EditUserForm initialValues={initialValues} updateData={setData} data={data}></EditUserForm>}
            </Popup>
            <LoginPopup openPopup={openLoginPopup} setOpenPopup={setLoginPopup}></LoginPopup>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return{
        accessToken:state.accessToken
    }
}

export default connect(mapStateToProps,null)(DisplayUsers)

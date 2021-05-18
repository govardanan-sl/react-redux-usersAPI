import { Avatar, Grid, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core'
import { DeleteOutline, EditOutlined, PeopleOutlineTwoTone } from '@material-ui/icons'
import AddIcon from '@material-ui/icons/Add';
import { Alert, Pagination } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'
import CreateUserForm from '../CreateUser/CreateUserForm';
import EditUserForm from '../EditUser/EditUserForm';
import ActionButton from '../Form/ActionButton';
import Button  from '../Form/Button'
import Popup from '../Form/Popup';
import PageHeader from '../Header/PageHeader'
import {useTable} from '../useTable'



const useStyles = makeStyles(theme=>({
    pageContent:{
        margin:theme.spacing(5),
        padding:theme.spacing(3)
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

function CreateUser() {
    const classes = useStyles();
    const [data,setData] = useState()
    const [isError,setIsError] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const {TableContainer,TbleHead} = useTable(headCells);
    const [openPopup,setOpenPopup] = useState(false);
    const [pageNo,setPageNo] = useState(1);
    const [editData,setEditData] = useState(null);
    const [successMessage,setSuccessMessage] = useState(null);
    useEffect(() => {
        let url ="https://reqres.in/api/users?page="+pageNo;
        let homeHeaders = new Headers();
        let requestOptions= {
            method: 'GET',
            headers:homeHeaders,
            redirect: 'follow'
        };
        fetch(url,requestOptions)
        .then(response => {
            setIsLoading(true)
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
        })
    },[pageNo]);
    const handlePageChange = (e,pageNo) =>{
        setPageNo(pageNo);
    }
    const handleEdit = (dt)=>{
        setEditData(dt);
        initialValues=dt;
    }
    const handleDelete = (id)=>{
        let url ="https://reqres.in/api/users/"+id;
        let homeHeaders = new Headers();
        let requestOptions= {
            method: 'DELETE',
            headers:homeHeaders,
            redirect: 'follow'
        };
        fetch(url,requestOptions)
        .then(response => {
            setIsLoading(true)
            if(response.status===204){
                setSuccessMessage("Deleted Successfully");
                let ndata=data.filter((element) => element.id!==id );
                setData(ndata);
                return response.json();
            }
            if(!response.ok){
                throw Error("Could not Fetch data");
            }
            return response.json();
        })
        .then(result => {
            setIsLoading(false);
            setIsError(false);
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
            <Paper className={classes.pageContent}>
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
               <TableContainer>
                    <TbleHead/>
                    <TableBody>
                        {
                            data&&data.map(dt=>
                                (<TableRow key={dt.id}>
                                    <TableCell>{dt.email}</TableCell>
                                    <TableCell>{dt.first_name}</TableCell>
                                    <TableCell>{dt.last_name}</TableCell>
                                    <TableCell><Avatar alt={dt.first_name} src={dt.avatar} /></TableCell>
                                    <TableCell>
                                        <ActionButton color="primary" onClick={()=>{handleEdit(dt)}}>
                                            <EditOutlined></EditOutlined>
                                        </ActionButton>
                                        <ActionButton color="secondary" onClick={()=>{handleDelete(dt.id)}}>
                                            <DeleteOutline></DeleteOutline>
                                        </ActionButton>
                                    </TableCell>
                                </TableRow>))
                        }
                    </TableBody>
               </TableContainer>
               <Pagination count={2} variant="outlined" shape="rounded"  style={{marginTop: "16px"}} onChange={handlePageChange}/>
            </Paper>
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
        </div>
    )
}

export default CreateUser
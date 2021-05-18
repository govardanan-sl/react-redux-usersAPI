import { Avatar, makeStyles, Paper, TableBody, TableCell, TableRow } from '@material-ui/core'
import { PeopleOutlineTwoTone } from '@material-ui/icons'
import { Pagination } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'
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
    {id:'avatar',label:'Avatar'}
]

function CreateUser() {
    const classes = useStyles();
    const [data,setData] = useState()
    const [isError,setIsError] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const {TableContainer,TbleHead} = useTable(headCells);
    const [pageNo,setPageNo] = useState(1);
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
            console.log(data);
        })
        .catch(err=>{
            setIsError(err.message);
            setIsLoading(false);
        })
    },[pageNo]);
    const handlePageChange = (e,pageNo) =>{
        setPageNo(pageNo);
    }
    return (
        <div>
            <PageHeader
                title="All Users"
                subTitle="View and edit all the users" icon={<PeopleOutlineTwoTone fontSize="large"/>}/>
            <Paper className={classes.pageContent}>
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
                                </TableRow>))
                        }
                    </TableBody>
               </TableContainer>
               <Pagination count={2} variant="outlined" shape="rounded"  style={{marginTop: "16px"}} onChange={handlePageChange}/>
            </Paper>
        </div>
    )
}

export default CreateUser

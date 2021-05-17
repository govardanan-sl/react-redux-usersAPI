import { makeStyles, Paper } from '@material-ui/core'
import { PeopleOutlineTwoTone } from '@material-ui/icons'
import React from 'react'
import PageHeader from '../Header/PageHeader'
import CreateUserForm from './CreateUserForm'

const useStyles = makeStyles(theme=>({
    pageContent:{
        margin:theme.spacing(5),
        padding:theme.spacing(3)
    }
}))

function CreateUser() {
    const classes = useStyles();
    return (
        <div>
            <PageHeader
                title="Create New User"
                subTitle="Create new users for a job" icon={<PeopleOutlineTwoTone fontSize="large"/>}/>
            <Paper className={classes.pageContent}>
                <CreateUserForm/>
            </Paper>
        </div>
    )
}

export default CreateUser

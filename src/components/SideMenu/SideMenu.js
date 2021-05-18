import { makeStyles } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles({
    sideMenu:{
        display:'flex',
        flexDirection:'column',
        position:'absolute',
        left:'0px',
        width:'0px',
        height:'100%',
        backgroundColor:'#243153'
    }
})
function SideMenu() {
    const classes  = useStyles();
    return (
        <div className={classes.sideMenu}>
            
        </div>
    )
}

export default SideMenu

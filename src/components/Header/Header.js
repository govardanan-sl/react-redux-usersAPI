import { AppBar, Badge, Grid, IconButton, InputBase, Toolbar } from '@material-ui/core';
import { PowerSettingsNew } from '@material-ui/icons';
import React from 'react';
import useStyles from './Styles';
import SearchIcon from '@material-ui/icons/Search';
import { Loggout } from '../../Store/actions';
import { connect } from 'react-redux';


function Header(props) {
    const classes = useStyles();
    const handleOnClick =()=>{
        props.Loggout();
    }
    return (
        <AppBar position="sticky" className={classes.root}>
            <Toolbar>
                <Grid container>
                    <Grid item>
                        <InputBase 
                            placeholder="Search Users" 
                            startAdornment={<SearchIcon fontSize="small"></SearchIcon>}
                             className={classes.searchInput}   
                            />
                    </Grid>
                    <Grid item sm></Grid>
                    <Grid item>
                        {props.accessToken&&
                        <IconButton onClick={handleOnClick}>
                            <Badge color="primary">
                                <PowerSettingsNew/>
                            </Badge>
                        </IconButton>}
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

const mapStateToProps = (state) =>{
    return{
        accessToken:state.accessToken
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        Loggout:()=>{
            dispatch(Loggout());
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header)

import { AppBar, Badge, Grid, IconButton, InputBase, Toolbar } from '@material-ui/core';
import { NotificationsNone, PowerSettingsNew } from '@material-ui/icons';
import React from 'react';
import useStyles from './Styles';
import SearchIcon from '@material-ui/icons/Search';


function Header() {
    const classes = useStyles();
    return (
        <AppBar position="static" className={classes.root}>
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
                        <IconButton>
                            <Badge badgeContent={3} color="secondary">
                                <NotificationsNone/>
                            </Badge>
                        </IconButton>
                        <IconButton>
                            <Badge color="primary">
                                <PowerSettingsNew/>
                            </Badge>
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Header

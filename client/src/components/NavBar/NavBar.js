import React from "react";


import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { Link } from "react-router-dom";
import useStyles from './styles';
import memories from '../../images/memories.jpg';
import { findOrCreateUser } from "../../api";

import GoogleLogin from 'react-google-login';


function NavBar() {

    const responseGoogle=(response)=>{
        window.alert(JSON.stringify(response));
        findOrCreateUser(response);
        
    }

    const classes=useStyles();
    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <Typography className={classes.heading} variant="h2" align='center' >SUST CSE Society</Typography>
            <GoogleLogin
                clientId='1009985350274-qv47nfl0fkr8hfoh617mcuj13g750kkh.apps.googleusercontent.com'
                buttonText='Login'
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </AppBar>
    );
}

export default NavBar;
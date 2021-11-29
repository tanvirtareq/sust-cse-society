import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';


import { Container, AppBar, Typography, Grow, Grid, Avatar } from '@material-ui/core';
import { Link } from "react-router-dom";
import {} from 'dotenv/config';
// require('dotenv').config()

import useStyles from './styles';
import { findOrCreateUser } from "../../api";

import GoogleLogin from 'react-google-login';


function NavBar() {
    const [active, setActive] =useState("");
    const [user , setUser] = useState();
    let imgSource='';
    let navigate=useNavigate();

    const successResponseGoogle=(response)=>{
        const curUser=response.profileObj;
        findOrCreateUser(response);
        setUser(curUser);
        setActive("loggedIn");
        
       
    }
    const failureResponseGoogle=(response)=>
    {

    }
    const GOOGLE_CLIENT_ID='1009985350274-qv47nfl0fkr8hfoh617mcuj13g750kkh.apps.googleusercontent.com';
    console.log(GOOGLE_CLIENT_ID);
    console.log(process.env.GOOGLE_CLIENT_ID);
    const classes=useStyles();
    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <Typography className={classes.heading} variant="h2" align='center' >SUST CSE Society</Typography>
            {
                active !== "loggedIn" && (
                    <GoogleLogin
                        clientId={GOOGLE_CLIENT_ID}
                        buttonText='Login'
                        onSuccess={successResponseGoogle}
                        onFailure={failureResponseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                )
            }
            {
                active==="loggedIn" && (
                    <Avatar src={user.imageUrl} onClick={() => {navigate('/user/'+user.googleId)}} />
                )
            }
            
        </AppBar>
    );
}

export default NavBar;
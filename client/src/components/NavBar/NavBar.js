// import React, {useState, useEffect} from "react";
// import {useNavigate} from 'react-router-dom';
// import axios from "axios";


// import { Container, AppBar, Typography, Grow, Grid, Avatar, Button } from '@material-ui/core';
// import { Link } from "react-router-dom";
// import {} from 'dotenv/config';
// // require('dotenv').config()

// import useStyles from './styles';
// import { findOrCreateUser } from "../../api";

// import GoogleLogin from 'react-google-login';


// function NavBar() {
//     // const [active, setActive] =useState("");
//     const profile=JSON.parse(localStorage.getItem('profile'));
//     const [user , setUser] = useState(profile);
//     // const [uid, setUid]=useState();
//     let navigate=useNavigate();

//     // useEffect(()=>{
//     //     const profile=JSON.parse(localStorage.getItem('profile'));
//     //     // profile?(
//     //     //     console.log(profile);
//     //     //     setUid(profile._id);
//     //     //     console.log(uid);
//     //     //     setUser(profile);
//     //     // ):
//     //     // (
//     //     //     console.log("nothing");
//     //     // )
//     //     profile?setUid(profile._id):setUid(null);
//     //     profile?setUser(profile):setUser(null);
        
//     // }, [uid]);
    
//     // setUser(profile);

//     // localStorage.setItem("mytime", Date.now());

//     const successResponseGoogle= async (response)=>{
        
//         // const curUser=response.profileObj;
//         // console.log(curUser);
//         axios.post('http://localhost:5001/auth', response)
//         .then((response)=>{
//                 console.log(response);
//                 localStorage.setItem('profile', JSON.stringify(response.data));
//                 setUser(response.data);
//                 window.location.reload(false);
//                 // setUid(response.data._id);
//             }
//         );
//         // findOrCreateUser(response);
//         // await axios.get('http://localhost:5001/user/'+curUser.googleId)
//         // .then((response)=>{
//         //         console.log(response);
//         //         localStorage.setItem('profile', JSON.stringify(response.data));
//         //         setUser(response.data);
//         //         setUid(response.data._id);
//         //     }
//         // );
        
        
//         // console.log(user);
//         // setUser(curUser);
//         // setActive("loggedIn");
//     }
//     const failureResponseGoogle=(response)=>
//     {

//     }
//     const GOOGLE_CLIENT_ID='1009985350274-qv47nfl0fkr8hfoh617mcuj13g750kkh.apps.googleusercontent.com';
//     const classes=useStyles();
//     return (
//         <AppBar className={classes.appBar} position='static' color='inherit'>
//             <Typography className={classes.heading} variant="h2" align='center' >SUST CSE Society</Typography>
//             {
//                 user?(
//                     <div>
//                         <Avatar src={user.imageUrl} onClick={() => {navigate('/user/'+user._id)}} />
//                         <Button onClick={()=>{localStorage.removeItem('profile')
//                             // setUid(null);
//                             setUser(null);
//                             window.location.reload(false);
//                             // navigate('/');
//                         }}>LogOut</Button>
//                     </div>
//                 ):
//                 (
//                     <GoogleLogin
//                         clientId={GOOGLE_CLIENT_ID}
//                         buttonText='Login'
//                         onSuccess={successResponseGoogle}
//                         onFailure={failureResponseGoogle}
//                         cookiePolicy={'single_host_origin'}
//                     />
//                 )
//             }
//             {/* {
//                 active !== "loggedIn" && (
//                     <GoogleLogin
//                         clientId={GOOGLE_CLIENT_ID}
//                         buttonText='Login'
//                         onSuccess={successResponseGoogle}
//                         onFailure={failureResponseGoogle}
//                         cookiePolicy={'single_host_origin'}
//                     />
//                 )
//             }
//             {
//                 active==="loggedIn" && (
//                     <Avatar src={user.imageUrl} onClick={() => {navigate('/user/'+user.googleId)}} />
//                 )
//             } */}
            
//         </AppBar>
//     );
// }

// export default NavBar;



import React, { useState, useEffect } from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Poll, PostAdd, Search } from "@mui/icons-material";
import { Searchbox } from "./style/searchbar/Searchbox";
import { StyledInputBase } from "./style/searchbar/StyledInputBase";
import { SearchIconWrapper } from "./style/searchbar/SearchIconWrapper";
import { Iconbox } from "./style/iconbar/Iconbox";
import PostDialog from "../PostDialog/PostDialog";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
    const [open, setOpen] = useState(false);
    const [post, setPost] = useState("");
    const [user, setUser] = useState();
    const navigate=useNavigate();
    const [cnt, setCnt]=useState(0);

    useEffect(()=>{
        const profile=JSON.parse(localStorage.getItem('profile'));
        profile?setUser(profile):navigate('/sign-in');
        console.log(user);
        setCnt(1);
        // console.log(profile);
        // profile?(
        //     console.log(profile);
        //     setUid(profile._id);
        //     console.log(uid);
        //     setUser(profile);
        // ):
        // (
        //     console.log("nothing");
        // )
        // profile?setUid(profile._id):setUid(null);
        // profile?setUser(profile):setUser(null);
        
    }, [cnt]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        // Decide what to do with value
        setPost(value);
    };

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6">
                    CSE Society
                </Typography>
                <Searchbox>
                    <SearchIconWrapper> 
                        <Search /> 
                    </SearchIconWrapper>

                    <StyledInputBase 
                    placeholder="Search…" 
                    inputProps={
                        { 
                            'aria-label': 'search' 
                        }
                    } 
                    />    
                </Searchbox>
                <Box sx={{ flexGrow: 1 }} />
                <Iconbox>
                    { user && user.admin && 
                        <Link to={"/create-poll"}>
                            <Button 
                                variant="contained" 
                                disableElevation 
                                startIcon={<Poll /> }
                                >
                                POLL MANAGEMENT
                            </Button>
                        </Link>
                        
                    }
                                        
                    <Button 
                        variant="contained" 
                        disableElevation 
                        startIcon={<PostAdd /> }
                        onClick={handleClickOpen}
                        >
                        Create post
                    </Button>
                    <PostDialog open={open} onClose={handleClose} post={post} />
                </Iconbox>
                
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
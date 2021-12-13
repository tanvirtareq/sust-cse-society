import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from "./cse-logo-cut.png";

import React, {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import GoogleLogin from 'react-google-login';


const theme = createTheme();


export default function SignIn() {
    localStorage.removeItem('profile');

  const [user, setUser] = useState();
    const navigate=useNavigate();

    useEffect(()=>{
        const profile=JSON.parse(localStorage.getItem('profile'));
        profile?navigate('/'):setUser(null);
        
    }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const successResponseGoogle= async (response)=>{
        
    // const curUser=response.profileObj;
    // console.log(curUser);
    axios.post('http://localhost:5001/auth', response)
    .then((response)=>{
            console.log(response);
            localStorage.setItem('profile', JSON.stringify(response.data));
            setUser(response.data);
            navigate('/');
            // setUid(response.data._id);
        }
    );
    // findOrCreateUser(response);
    // await axios.get('http://localhost:5001/user/'+curUser.googleId)
    // .then((response)=>{
    //         console.log(response);
    //         localStorage.setItem('profile', JSON.stringify(response.data));
    //         setUser(response.data);
    //         setUid(response.data._id);
    //     }
    // );
    
    
    // console.log(user);
    // setUser(curUser);
    // setActive("loggedIn");
  }
  const failureResponseGoogle=(response)=>
  {

  }
  
  const GOOGLE_CLIENT_ID='1009985350274-qv47nfl0fkr8hfoh617mcuj13g750kkh.apps.googleusercontent.com';
  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            //backgroundColor: "black",
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Container>
            <center>
              <img alt='logo' src = {Logo} width = "150" height = "100" />
            </center>
          </Container>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {/* <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            /> */}
            {/* <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            /> */}
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            {/* <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button> */}
            <GoogleLogin fullWidth variant="contained"  sx={{ mt: 3, mb: 2 }}
              clientId='1009985350274-qv47nfl0fkr8hfoh617mcuj13g750kkh.apps.googleusercontent.com'
              buttonText='Login'
              onSuccess={successResponseGoogle}
              onFailure={failureResponseGoogle}
              cookiePolicy={'single_host_origin'}
            >Log In With Google</GoogleLogin>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
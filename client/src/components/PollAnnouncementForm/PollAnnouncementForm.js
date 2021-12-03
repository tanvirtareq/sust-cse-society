import React, {useState, useEffect} from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyles from './styles';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
function PollAnnouncementForm()
{
    let navigate=useNavigate();
    const profile=JSON.parse(localStorage.getItem('profile'));
    const [user , setUser] = useState(profile);
    const [postData, setPostData] = useState({
        Announcement:'',
        Catagory:[]
    });
    useEffect(()=>{
            if(user==null || user.admin==false)
            {
                navigate('/');
            }
        }
    );
    const handleSubmit = (e) => {
        window.alert(JSON.stringify(postData));
        axios.post('http://localhost:5001/pollAnnouncement', postData)
        .then((response)=>{
                window.alert(response);
            }
        );
    }
    const classes = useStyles();
    return(
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={classes.form} onSubmit={handleSubmit}>
                <Typography variant="h6">Poll Announcement</Typography>
                <TextField
                    name='Announcement'
                    variant='outlined'
                    label='Announcement'
                    fullWidth
                    value={postData.Announcement}
                    onChange={(e) => setPostData({Announcement: e.target.value})}
                />
                <TextField
                    name='Catagory'
                    variant='outlined'
                    label='Catagory'
                    fullWidth
                    value={postData.Catagory}
                    onChange={(e) => postData.Catagory.push(e.target.value)}
                />
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>submit</Button>
            </form> 
        </Paper>
    );
}

export default PollAnnouncementForm;
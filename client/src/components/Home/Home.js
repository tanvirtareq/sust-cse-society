import { useEffect, useState } from "react";

import { Container,  Grow, Grid, Button } from '@material-ui/core';
import Posts from '../Posts/Posts.js'
import Form from "../Form/Form.js";
import { useDispatch } from "react-redux";
import {getPosts} from '../../actions/posts'
import PollAnouncementForm from "../PollAnnouncementForm/PollAnnouncementForm.js";
import {useNavigate} from 'react-router-dom';
import { PollAnnouncements } from "../PollAnnouncements/PollAnnouncements.js";



function Home() {
    // const dispatch = useDispatch();
    // useEffect(() => {    
    //     dispatch(getPosts());
    // }, [dispatch]);
    let navigate=useNavigate();
    const profile=JSON.parse(localStorage.getItem('profile'));
    const [user , setUser] = useState(profile);
    function createPollAnnouncement(){
        navigate('/pollAnnouncementForm');
    }
    return (
        <Grow in>
            <Container>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7} >
                        <Button onClick={()=>{navigate('/pollAnnouncements')}}>Poll Announcements</Button>
                        <Button onClick={()=>{navigate('/runningElections')}}>Running Election</Button>
                        <Posts />
                    </Grid>
                    <Grid item xs={12} sm={4} >
                        <Form />
                        {(user!=null && user.admin) && (
                            <Button onClick={createPollAnnouncement}>create Poll Announcement</Button>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}

export default Home;

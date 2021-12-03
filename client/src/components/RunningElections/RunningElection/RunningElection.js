import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import { useNavigate } from 'react-router';
import FormControl from '@mui/material/FormControl';
import { VotingForm } from './VotingForm/VotingForm';
import axios from 'axios';

export const RunningElection=(props)=>{
    const navigate=useNavigate();
    // console.log(props);
    const publishResult=()=>{
        console.log(props.poll._id);
        axios.post('http://localhost:5001/publishPollResult/'+props.poll._id).then((err, docs)=>{
            navigate('/pollResults');
        });
    }
    return (
        <div>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
                        {props.poll.Announcement}
            </Typography>
            {props.poll.Catagory.map(d=>(<VotingForm key={d._id} catagory={d} user={props.user}/>))}
            {props.user.admin && (
                <Button onClick={publishResult}> publish result</Button>
            )}
            {/* <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography>hello</Typography>
                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                        {props.poll.Announcement}
                    </Typography>
                    <Typography sx={{fontSize:14}} gutterBottom>
                        {props.poll.Catagory.map(d=>(<li key={d._id} >
                            {d.catagory}
                            <br/>
                            {d.participant.map(e=>(<li>{e.userId.userId}</li>))}
                        </li>))}
                    </Typography>
                </CardContent>
                {props.user!=null && props.user.admin==false &&
                    <CardActions>
                        <Button size="small" onClick={()=>{navigate('/applyForPoll/'+props.pollAnnouncementId)}}>
                            Apply
                        </Button>
                    </CardActions>
                }
                
            </Card>
            <br/> */}
        </div>
        
    );
}
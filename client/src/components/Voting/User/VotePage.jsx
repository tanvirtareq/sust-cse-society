import { Container, Stack, FormControl, RadioGroup, FormControlLabel, FormLabel, Radio} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { VotingForm } from "../../RunningElections/RunningElection/VotingForm/VotingForm";
import { styled, Typography, Box, Card, CardActions, CardContent, Button } from "@mui/material";

import * as React from 'react';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';


const VoteContainer = styled(Container)(({theme}) => ({
    paddingTop: theme.spacing(10),
    height: '100%',
    overflow: 'auto'
}));

const ShowParticipant=(props)=>{
    const {participant}=props;
    console.log(participant);
    return (
        <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary={participant.userId.userId+' ( '+participant.vote+' ) '} />
            </ListItemButton>
        </List>
    );
}


const ShowParticipants=(props)=>{
    let {participants, catagory, poll, user}=props;
    const [value, setValue] = useState('');
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const handleSubmit=()=>{
        console.log(catagory._id);
        console.log(value);
        console.log(user._id);
        axios.post('http://localhost:5001/voteFor/'+catagory._id, {vote:value, userId:user._id});
        // axios.post('http://localhost:5001/applyForPoll/'+id, {catagory:value, user:user, pollId:id});
        // axios.post('http://localhost:5001/applyForPoll/'+id, value);

    }
    return (
        <>
             <FormControl component="fieldset">
                <RadioGroup
                    aria-label="gender"
                    name="radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                >
                    {participants.map(participant=>(<FormControlLabel value={participant.userId.userId} control={<Radio />} label={participant.userId.userId} />))}
                    {/* <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
                </RadioGroup>
                {/* {participants.map(participant=>(<ShowParticipant participant={participant}/>))} */}
                <Button onClick={handleSubmit}>Vote</Button>
            </FormControl>
            
        </>
    );
}


const ShowCatagory=(props)=>{
    const {catagory, poll, user}=props;
    console.log(catagory);
    const [open, setOpen] = React.useState(true);
    const handleClick = () => {
      setOpen(!open);
    };
    return (
            <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={catagory.catagory} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <ShowParticipants participants={catagory.participant} catagory={catagory} poll={poll} user={user} />
                {/* {catagory.participant.map(participant=>(<ShowParticipant participant={participant}/>))} */}
            </Collapse>
      </List>
    );
}


const ShowRunningElection=(props)=>{
    const {election,user}=props;

    const handlePublishPollResult=async()=>{
        var rt=await axios.post('http://localhost:5001/publishPollResult/'+election._id);
        if(rt)
        {
            window.location.reload(false);
        }
    }

    return (
        <>
        <Card sx={{ minWidth: 275 }}>
        <CardContent>
            <Typography variant="h5" component="div">
            {
                election.title
            }
            </Typography>
            {election.catagory.map(catagory=>(<ShowCatagory catagory={catagory} poll={election} user={user} />))}
            {/* {election.catagory.map(catagory=>(<NestedList catagory={catagory}/>))} */}
            {/* <NestedList catagory={election.catagory}/> */}
            {user!=null && user.admin && <Button variant="outlined" onClick={handlePublishPollResult} >Publish Result</Button>}
        </CardContent>
        {/* <CardActions>
            <Button size="small">Learn More</Button>
        </CardActions> */}
        </Card>
        <br/>
        <br/>
        </>
    );
}


const ShowRunningElections=(props)=>{
    // console.log(props);
    const {elections, user} =props;
    // console.log(elections);
    return (
        <>
            {elections.map(election=>(<ShowRunningElection election={election} user={user}/>))}
        </>
    );
}


const VotePage = () => {
    const [cnt, setCnt]=useState(0);
    const profile=JSON.parse(localStorage.getItem('profile'));
    const [user , setUser] = useState(profile);
    const [runningPoll, setRunningPoll]=useState([]);

    useEffect(()=>{
        axios.get('http://localhost:5001/runningElections').then((res)=>{
            console.log(res.data);
            if(res.data.length>0)
                setRunningPoll(res.data);
        });
    }, []);


    // const handlePublishPollResult=async()=>{
    //     var rt=await axios.post('http://localhost:5001/publishPollResult/'+poll._id);
    //     if(rt)
    //     {
    //         window.location.reload(false);
    //     }
    // }

    return (
        <VoteContainer>
            {runningPoll.length?(<ShowRunningElections elections={runningPoll} user={user}/>):(<Typography>No Results found </Typography>)}
        </VoteContainer>
    );

    // return(
    //     <VoteContainer>
    //         <Typography variant="h4"> Vote here </Typography>
    //         <br />
    //         <form autoComplete='off'>
    //         {
    //             post.map(data =>(<VotingForm  key={data._id} catagory={data} user={user} />)) 
    //         }
    //         </form>
    //         <Button variant="outlined" onClick={handlePublishPollResult} >Publish Result</Button>
    //     </VoteContainer>
    // );
}

export default VotePage;
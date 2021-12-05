import { Container, styled, Typography, Box, Card, CardActions, CardContent, Button } from "@mui/material";
import axios from "axios";
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
import Divider from '@mui/material/Divider';
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';


const CardPost = styled(Card)(({theme}) => ({
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing(2)  
}));




const PollResultContainer = styled(Container)(({theme}) => ({
    paddingTop: theme.spacing(10),
    height: '100%',
    overflow: 'auto'
}));

function NestedList(props) {
    const {catagory}=props;
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
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Nested List Items
          </ListSubheader>
        }
      >
        <ListItemButton>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Sent mail" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItemButton>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    );
  }

const ShowParticipant=(props)=>{
    const {participant}=props;
    console.log(participant);
    return (
        <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
                <StarBorder />
            </ListItemIcon>
            <ListItemText primary={participant.userId.userId+' ( '+participant.vote+' ) '} />
            </ListItemButton>
        </List>
    );
}



const ShowParticipants=(props)=>{
    let {participants}=props;
    participants=participants.sort((a, b)=>(b.vote-a.vote));
    var isTie=false;
    if(participants.length>1 && participants[0].vote==participants[1].vote) isTie=true;
    return (
        <>
            {participants.map(participant=>(<ShowParticipant participant={participant}/>))}
            {participants.length>0 && isTie && (<Typography>There's Tie</Typography>)}
            {participants.length>0 && isTie==false && (<Typography>Winner is {participants[0].userId.userId}</Typography>)}
        </>
    );
}

const ShowCatagory=(props)=>{
    const {catagory}=props;
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
                <ShowParticipants participants={catagory.participant}/>
                {/* {catagory.participant.map(participant=>(<ShowParticipant participant={participant}/>))} */}
            </Collapse>
            <Divider variant="middle" />
      </List>
    );
}

const ShowResult=(props)=>{
    const {election}=props;
    return (
        <>
        <CardPost sx={{maxWidth: 550}}>
        <CardContent>
            <Typography variant="h5" component="div">
            {
                election.title
            }
            </Typography>
            {election.catagory.map(catagory=>(<ShowCatagory catagory={catagory}/>))}
            {/* {election.catagory.map(catagory=>(<NestedList catagory={catagory}/>))} */}
            {/* <NestedList catagory={election.catagory}/> */}
        </CardContent>
        {/* <CardActions>
            <Button size="small">Learn More</Button>
        </CardActions> */}
        </CardPost>
        <br/>
        <br/>
        </>
    );
}

const ShowResults=(props)=>{
    // console.log(props);
    const {elections} =props;
    // console.log(elections);
    return (
        <>
            {elections.map(election=>(<ShowResult election={election}/>))}
        </>
    )
}

const PollResultPage = () => {
    const [user, setUser]=useState(null);
    const profile=JSON.parse(localStorage.getItem('profile'));
    const [elections, setElections]=useState([]);
    const [cnt, setCnt]=useState(0);
    const navigate=useNavigate();

    useEffect(()=>{
        async function fetchData(){
            const elec=await axios.get('http://localhost:5001/pollResults');
            setElections(elec.data);
            // console.log(elec.data);
        }
        fetchData();
        setCnt(1);
    }, [cnt]);

    return(
        <>
        <PollResultContainer>
            {
                elections.length?(<ShowResults elections={elections}/>):(<Typography>No Results found </Typography>)
            }
        </PollResultContainer>
        </>
    );
}

export default PollResultPage;
import { PlayArrow } from "@mui/icons-material";
import { Button, Container, styled, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ApplyDialog from "./ApplyDialog";
import { useNavigate } from "react-router";

// const positions = ['Vice President', 'General Secretary', 'Assistant General Secretary', 'Executive Member'];

import VotePage from './VotePage';

const PollPageContainer = styled(Container)(({theme}) =>({
    //backgroundColor: 'yellow',
    paddingTop: theme.spacing(10),
    height: '100%',
    overflow: 'auto'
}));

const PollEventPage = () => {
    const [open, setOpen] = useState(false);
    const [cnt, setCnt]=useState(0);
    const profile=JSON.parse(localStorage.getItem('profile'));
    const [user , setUser] = useState(profile);
    const [positions, setPositions]=useState([]);
    const [pollAnnouncements, setPollAnnouncements]=useState();
    const navigate=useNavigate();
    const handleClickOpen = () => {
        if(positions.length>0)
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };
    const handleStartAPoll=async ()=>{
        
        var rt=await axios.post('http://localhost:5001/startPoll/'+pollAnnouncements._id);
        if(rt)
        {
            window.location.reload(false);
        }
    }


    useEffect(()=>{
            axios.get('http://localhost:5001/pollAnnouncements')
            .then((res)=>{
                    // console.log(res.data[0]);
                    if(res.data.length==0)
                    {
                        axios.get('http://localhost:5001/runningElections').then((res)=>{
                            console.log(res.data);
                            if(res.data.length>0)
                                setPollAnnouncements(res.data[0]);
                        });
                    }
                    else
                    {
                        setPollAnnouncements(res.data[0]);
                        console.log(pollAnnouncements);
                        var tmp =(res.data[0].catagory.map(d=>(d.catagory)));
                        console.log(tmp);
                        setPositions(tmp);
                        console.log(positions);
                    }
                    
                }
            );
            setCnt(1);
        }, []
    );

    return(
        <PollPageContainer>
            {pollAnnouncements? pollAnnouncements.running? (<VotePage poll={pollAnnouncements} user={user} />):(
            <>
            <Typography variant="h4">{pollAnnouncements.title}</Typography>
            <br />
            <Typography variant="body2">{pollAnnouncements.description}</Typography>
            {/* <Typography variant="body2"> The pole will be run to elect candidates for the following positions:</Typography> */}
            <br />
            {
                pollAnnouncements.catagory.map((pos) =>(
                    <Typography key={pos._id}> <PlayArrow /> {pos.catagory}</Typography>
                ))
            }
            <br /> <br />
            <Button variant="outlined" onClick={handleClickOpen}>Click to apply</Button>
            {(user!=null && user.admin) && (<Button variant="outlined" onClick={handleStartAPoll}>Start this Poll</Button>)}
            <ApplyDialog
            open={open}
            onClose={handleClose}
            positions={positions}
            user={user}
            id={pollAnnouncements._id} />
            </>
            ):(
                <Typography>No elections</Typography>
            )
            }
        </PollPageContainer>
    );
};

export default PollEventPage;
import { useNavigate } from 'react-router';
import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { PlayArrow } from "@mui/icons-material";
import axios from 'axios';
import { styled } from '@mui/material';

import ApplyDialog from '../../Voting/User/ApplyDialog';

const CardPost = styled(Card)(({theme}) => ({
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing(2)  
}));

export const PollAnnouncement=(props)=>{
    // console.log(props.user);
    console.log(props);
    const navigate=useNavigate();
    const poll=props.poll;
    const user=props.user;
    const [open, setOpen] = useState(false);
    const [positions, setPositions]=useState([]);
    const handleClickOpen = () => {
        // if(poll.length>0)
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleStartAPoll=async ()=>{
        
        var rt=await axios.post('http://localhost:5001/startPoll/'+poll._id);
        if(rt)
        {
            window.location.reload(false);
        }
    }
    return (
        <>
        <CardPost sx={{maxWidth: 550}}>
            <CardContent>
                <>
                    <Typography variant="h4">{poll.title}</Typography>
                    <br />
                    <Typography variant="body2">{poll.description}</Typography>
                    <br />
                    {poll.catagory.map((pos) =>(<Typography key={pos._id}> <PlayArrow /> {pos.catagory}</Typography>))}
                    <br /> <br />
                    <Button variant="outlined" onClick={handleClickOpen}>Click to apply</Button>
                    {(user!=null && user.admin) && (<Button variant="outlined" onClick={handleStartAPoll}>Start this Poll</Button>)}
                    <ApplyDialog
                    open={open}
                    onClose={handleClose}
                    positions={positions}
                    poll={poll}
                    user={user}
                    id={poll._id} />
                </>
            </CardContent>
        </CardPost>
        <br/>
        <br/>
        </>
    );

    // return (
    //     <div>
    //         <Card sx={{ minWidth: 275 }}>
    //             <CardContent>
    //                 <Typography sx={{ fontSize: 14 }} gutterBottom>
    //                     hello
    //                 </Typography>
    //                 {/* <Typography sx={{fontSize:14}} gutterBottom>
    //                     {props.Catagory.map(d=>(<li key={d._id} >{d.catagory}</li>))}
    //                 </Typography> */}
    //             </CardContent>
    //             {/* {props.user!=null && props.user.admin==false &&
    //                 <CardActions>
    //                     <Button size="small" onClick={()=>{navigate('/applyForPoll/'+props.pollAnnouncementId)}}>
    //                         Apply
    //                     </Button>
    //                 </CardActions>
    //             } */}
                
    //         </Card>
    //         <br/>
    //     </div>
        
    // );
}
import axios from 'axios';
import react, {useEffect, useState} from 'react';
import { PollAnnouncement } from './PollAnnouncement/PollAnnouncement';
import { Button, Container, styled, Typography } from "@mui/material";

const PollAnnouncementsContainer = styled(Container)(({theme}) => ({
    paddingTop: theme.spacing(10),
    height: '100%',
    overflow: 'auto'
}));


export const PollAnnouncements=()=>{
    const profile=JSON.parse(localStorage.getItem('profile'));
    const [user , setUser] = useState(profile);
    const [pollAnnouncements, setPollAnnouncements]=useState([]);
    
    useEffect(()=>{
            axios.get('http://localhost:5001/pollAnnouncements')
            .then((res)=>{
                    console.log(res.data);
                    setPollAnnouncements(res.data);
                }
            );
        }, [user]
    );
    // console.log(user);

    return (
        <PollAnnouncementsContainer>
        {pollAnnouncements.length?(<>{pollAnnouncements.map(d => (<PollAnnouncement key={d._id} user={user} poll={d} />))}</>):(
            <Typography>No Results Found</Typography>
        )}
            
        </PollAnnouncementsContainer>
    );

    // return (
    //     <PollAnnouncementsContainer>
    //         {pollAnnouncements.map(d => (<PollAnnouncement key={d._id} user={user} pollAnnouncementId={d._id} Announcement={d.Announcement} Catagory={d.Catagory} />))} 
    //     </PollAnnouncementsContainer>
    //     {/* <div>
    //         <ul>
    //             {pollAnnouncements.map(d => (<PollAnnouncement key={d._id} user={user} pollAnnouncementId={d._id} Announcement={d.Announcement} Catagory={d.Catagory} />))} 
    //         </ul>
    //     </div> */}
    // );
}
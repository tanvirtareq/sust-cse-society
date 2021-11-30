import axios from 'axios';
import react, {useEffect, useState} from 'react';
import { PollAnnouncement } from './PollAnnouncement/PollAnnouncement';

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
        <div>
            <ul>
                {pollAnnouncements.map(d => (<PollAnnouncement key={d._id} user={user} pollAnnouncementId={d._id} Announcement={d.Announcement} />))} 
            </ul>
        </div>
    );
}
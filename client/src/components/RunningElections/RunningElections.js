import axios from 'axios';
import react, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router';
import { RunningElection } from './RunningElection/RunningElection';

export const RunningElections=()=>{
    // const profile=JSON.parse(localStorage.getItem('profile'));
    const [user , setUser] = useState(null);
    const [runningElections, setRunningElections]=useState([]);
    const [cnt, setCnt]=useState(0);
    const navigate=useNavigate();
    useEffect(()=>{
            const profile=JSON.parse(localStorage.getItem('profile'));
            profile?setUser(profile):navigate('/');
            axios.get('http://localhost:5001/runningElections')
            .then((res)=>{
                    console.log(res.data);
                    setRunningElections(res.data);
                }
            );
            setCnt(1);
        }, [cnt]
    );
    // console.log(user);

    return (
        <div>
            {runningElections.map(d=>(<RunningElection key={d._id} poll={d} user={user}/>))}
        </div>
    );
}
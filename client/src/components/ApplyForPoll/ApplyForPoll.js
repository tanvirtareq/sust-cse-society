import { Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router"
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { Button } from "@material-ui/core";


export const ApplyForPoll=(props)=>{
    // console.log(props.id);
    const {id}=useParams();
    console.log(id);
    const [user, setUser]=useState();
    const [count, setCount]=useState(0);
    let navigate=useNavigate();
    const [pollDetails, setPollDetails]=useState();
    const [value, setValue] = useState('');
    const [transaction, setTransaction]=useState('');
    useEffect(()=>{
            const profile=JSON.parse(localStorage.getItem('profile'));
            profile?setUser(profile):setUser(null);
            (!profile || profile.admin==true)?navigate('/'):console.log('authorized');
            axios.get("http://localhost:5001/pollDetails/"+id)
            .then((res)=>{
                console.log(res.data);
                setPollDetails(res.data);
                console.log(pollDetails);
            })
            setCount(1);
        }, [count]
    );
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const handleSubmit=()=>{
        console.log(id);
        axios.post('http://localhost:5001/applyForPoll/'+id, {catagory:value, transaction:transaction, user:user, pollId:id});
        // axios.post('http://localhost:5001/applyForPoll/'+id, value);

    }
    return (
        <div>
            {pollDetails?(
                <div>
                    <p>
                        {pollDetails.Announcement}
                    </p>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Catagory</FormLabel>
                        <RadioGroup
                            aria-label="Catagory"
                            name="radio-buttons-group"
                            value={value}
                            onChange={handleChange}
                        >
                            {pollDetails.Catagory.map(d=>(<FormControlLabel key={d._id} value={d.catagory} label={d.catagory} control={<Radio/>} />))}
                        </RadioGroup>
                        <TextField 
                            label="transaction" 
                            variant="outlined" 
                            value={transaction}
                            onChange={(e)=>{setTransaction(e.target.value)}}
                        />
                        <Button onClick={handleSubmit}>
                            Submit
                        </Button>
                    </FormControl>
                </div>
                
            ):
            (
                <p>
                    no data
                </p>
            )}
        </div>
    )
}
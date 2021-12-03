import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';


export const VotingForm=(props)=>{
    console.log(props);
    const [value, setValue] = useState('');
    const handleSubmit=()=>{
        console.log(value);
        axios.post('http://localhost:5001/voteFor/'+props.catagory._id, {vote:value, userId:props.user._id});
    }
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    return(
        <FormControl component="fieldset">
      <FormLabel component="legend">{props.catagory.catagory}</FormLabel>
      <RadioGroup
        aria-label={props.catagory.catagory}
        name={props.catagory.catagory}
        value={value}
        onChange={handleChange}
      >
      {props.catagory.participant.map(d=>(<FormControlLabel key={d._id} value={d.userId.userId} control={<Radio />} label={d.userId.userId} />    
      ))}
      <Button onClick={handleSubmit}>submit</Button>
        {/* <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
      </RadioGroup>
    </FormControl>
    )
}
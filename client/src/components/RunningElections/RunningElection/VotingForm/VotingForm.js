import * as React from 'react';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
import { Button } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { Container, Stack, styled, Typography, RadioGroup, FormControlLabel, FormLabel, Radio } from "@mui/material";



export const VotingForm=(props)=>{
  const {catagory, user}=props;
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
      <>
        <Stack  direction='row'>
            <FormControl component="fieldset">
              <FormLabel component="legend">{catagory.catagory}</FormLabel>
                {(catagory.participant.length==0)?(
                  <Typography>There are no candidate for this Post</Typography>
                ):(
                <RadioGroup
                aria-label='names'
                name='radio'
                value={value}
                onChange={handleChange}
                >
                {
                catagory.participant.map((name) => (
                        <FormControlLabel value={name.userId.userId} control={<Radio />} label={name.userId.userId} />
                    ))
                }
                </RadioGroup>
                )}
            </FormControl>
        </Stack>
      <Button onClick={handleSubmit}>submit</Button>
      </>
      );

}
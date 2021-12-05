import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const ApplyDialog = (props) => {
    const {onClose, open, data, positions, user,poll, id} = props;
    const [value, setValue]=useState();

    const handleClose = () => {
        onClose(data);
    }
    const handleApply=()=>{
        console.log(user);
        console.log(id);
        console.log(value);
        console.log(poll._id);
        axios.post('http://localhost:5001/applyForPoll/'+poll._id, {catagory:value, user:user, pollId:poll._id});
        handleClose();
    }
    const handleChange=(e)=>{
        setValue(e.target.value);
    }

    return(
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
            <DialogTitle>
                <Typography variant="h6">Apply for a position</Typography>
            </DialogTitle>
            <DialogContent>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Positions</FormLabel>
                    <RadioGroup
                        aria-label="gender"
                        name="radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                    >
                        {
                            poll.catagory.map((pos) => (
                                <FormControlLabel value={pos.catagory} control={<Radio />} label={pos.catagory} />
                            ))
                        }
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleApply}>Apply</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ApplyDialog;
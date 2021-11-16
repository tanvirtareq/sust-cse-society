import React, { useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { createPost } from "../../actions/posts";

const Form = () => {
    const [postData, setPostData] = useState({
        creator: ''
    });
    const classes = useStyles();
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        // e.prevantDefault();
        window.alert(postData.creator);

        dispatch(createPost(postData));
    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={classes.form} onSubmit={handleSubmit}>
                <Typography variant="h6">Creating</Typography>
                <TextField
                    name='creator'
                    variant='outlined'
                    label='Creator'
                    fullWidth
                    value={postData.creator}
                    onChange={(e) => setPostData({ ...postData, creator: e.target.value })}

                />
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>submit</Button>
            </form>

        </Paper>
    );
}
export default Form;
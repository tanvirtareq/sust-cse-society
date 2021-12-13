import { alpha, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputBase, styled, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const PostInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {

    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const PostDialog = (props) => {
  const { open, onClose, post, user} = props;

  const [val, setVal]=useState();

  const handleClose = () => {
    onClose(post);
  };

  const handlePost = async () => {
    console.log(val);
    var rt=await axios.post('http://localhost:5001/', {post:val, user:user});
    if(rt)
    {
        console.log(rt);
        window.alert("Post Shared Successfully");
        window.location.reload(false);
        onClose(post);
    }
    // onClose(post);
  };
  const handleGoToMarkdownEditor=()=>{
    navigate('/markdownEditor');
    onClose(post);
  }
  const navigate=useNavigate();
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h6"> Create Post </Typography>
      </DialogTitle>
      <DialogContent>
        <PostInput
          fullWidth
          multiline
          rows={5}
          placeholder="Write anything you want..." 
          value={val}
          onChange={(e)=>{setVal(e.target.value)}}
          />

      </DialogContent>
      <DialogActions>
        <Button onClick={handleGoToMarkdownEditor}>Go to markdown editor</Button>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handlePost}>Post</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostDialog;
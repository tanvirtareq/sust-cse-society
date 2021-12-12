import { CommentOutlined, MoreVert, Share, ThumbDownOutlined, ThumbUpOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, IconButton, styled, Typography } from "@mui/material";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'
import { useState } from "react";

import { useNavigate } from "react-router";

import axios from 'axios';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const CardPost = styled(Card)(({ theme }) => ({
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing(2)
}));

const ResponsiveButton = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}));

const ResponsiveIconButton = styled(IconButton)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'none'
    }
}));

const CardSimplePost = (props) => {
    var { currentUser, postDetails ,post, name, date, avatarLink, posts, setPosts } = props;
    const navigate=useNavigate();
    // console.log(avat)
    console.log(postDetails);
    console.log(currentUser);
    console.log(date);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDetails=()=>{
       
        navigate('/postDetails/'+postDetails?._id);
        handleClose();
    }
    const handleForkPost=()=>{
        navigate('/forkPost/'+postDetails._id);
        handleClose();
    }

    const handleEditPost=()=>{
        navigate('/editPost/'+postDetails._id);
        handleClose();
    }

    const handleDeletePost=async ()=>{
        const ret=await axios.post('http://localhost:5001/deletePost', {_id:postDetails._id});
        if(ret)
        {
            // navigate('/');
            posts=posts?.filter((e)=>(e?._id!=postDetails?._id));
            setPosts(posts);
            console.log('oise?');
            handleClose();
        }
    }

    return (
        <CardPost sx={{ maxWidth: 700 }} >
            <CardHeader
                avatar={<Avatar src={postDetails.creator.imageUrl} />}   
                action={
                    <>

                    <IconButton aria-label="settings" aria-controls="basic-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <MoreVert />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleDetails}>Details</MenuItem>
                        <MenuItem onClick={handleForkPost}>Fork</MenuItem>
                        {
                           (postDetails?.creator?._id==currentUser?._id) && (
                               <>
                                    <MenuItem onClick={handleEditPost}>Edit</MenuItem>
                                    <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
                               </>
                           ) 
                        }
                    </Menu>
                    </>
                    
                }
                title={name}
                subheader={date} />
            <CardContent sx={{overflowX: 'auto'}}>
                <ReactMarkdown  children={post} remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}
                    components={{
                            code({node, inline, className, children, ...props}) {
                                const match = /language-(\w+)/.exec(className || '')
                                return !inline && match ? (
                                <SyntaxHighlighter
                                    children={String(children).replace(/\n$/, '')}
                                    style={dark}
                                    language={match[1]}
                                    PreTag="div"
                                    {...props}
                                />
                                ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                                )
                            }
                            }}
                />
                {/* <Typography variant='body1'> {post}</Typography> */}
            </CardContent>
            <CardActions>
                <Box sx={{ flexGrow: 1 }} />
                <ResponsiveButton size="small" startIcon={<ThumbUpOutlined />}>Upvote</ResponsiveButton>
                <ResponsiveIconButton><ThumbUpOutlined /></ResponsiveIconButton>
                <Box sx={{ flexGrow: 1 }} />
                <ResponsiveButton size="small" startIcon={<ThumbDownOutlined />}>Downvote</ResponsiveButton>
                <ResponsiveIconButton><ThumbDownOutlined /></ResponsiveIconButton>
                <Box sx={{ flexGrow: 1 }} />
                <ResponsiveButton size="small" startIcon={<CommentOutlined />}>Comment</ResponsiveButton>
                <ResponsiveIconButton><CommentOutlined /></ResponsiveIconButton>
                <Box sx={{ flexGrow: 1 }} />
                <ResponsiveButton size="small" startIcon={<Share />}>Share</ResponsiveButton>
                <ResponsiveIconButton><Share /></ResponsiveIconButton>
                <Box sx={{ flexGrow: 1 }} />
            </CardActions>
        </CardPost>
    );
};

export default CardSimplePost;
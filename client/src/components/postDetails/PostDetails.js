import { Avatar, Container, styled, TextField, Typography} from "@mui/material";
import CardSimplePost from "../CardSimplePost/CardSimplePost";
import { useState, useEffect } from "react";
import axios from "axios";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'
import Button from '@mui/material/Button';


import React from 'react'
import ReactDOM from 'react-dom'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import injectTapEventPlugin from 'react-tap-event-plugin'
import MarkdownEditor from 'material-ui-markdown-editor'    
import 'codemirror/lib/codemirror.css' // import codemirror styles
import 'material-ui-markdown-editor/dist/MarkdownEditor/codemirrorOverride.css' // import override styles
import TextareaAutosize from '@mui/material/TextareaAutosize';

import './postDetails.css';
import '../markdownEditorPage/markdownEditorPage.css';

import { Calculate } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
 
// injectTapEventPlugin();


const ContainerFeed = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(10),
    // backgroundColor: 'yellow',
    height: '100%',
    overflow: 'auto',
    
}));

const MarkdownViewer=(props)=>{
    const {value}=props;
    return (
        <div className="markdownViewer">
            <ReactMarkdown  children={value} remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}
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
        </div>
    );
}

const PostDetails = () => {
    // window.alert(props);
    // console.log(props);
    const {id}=useParams();
    // console.log(id);
    const [feeds, setFeeds]=useState([]);
    const [value, setValue]=useState();
    const profile=JSON.parse(localStorage.getItem('profile'));
    const [post, setPost]=useState();
    const navigate=useNavigate();
    const handleForkPost = async () => {
        navigate('/forkPost/'+id);
        // onClose(post);
      };
      

    useEffect(()=>{
        const getPostDetails=async()=>{
            var ret=await axios.get('http://localhost:5001/postDetails/'+id)
            console.log(ret);
            if(ret)
            {
                setValue(ret.data.post);
                setPost(ret.data);
                console.log(value);
            }
        }
        getPostDetails();
    }, []);

    return (
        <ContainerFeed>
            <Avatar src={post?.creator?.imageUrl}/>
            <Typography> {post?.creator?.userId} </Typography>
            <br/>
            <Button variant="outlined"  onClick={handleForkPost}>Fork Post</Button>
            <div className="container" >
                {/* <div className="textEditor">
                    {value}
                </div> */}
                <div className="textEditor">
                    <TextareaAutosize readOnly
                    minRows={10}
                    style={{ width:'100%', height:'100%'}}
                    value={value}
                    />
                </div>
                
                <MarkdownViewer
                value={value}/>
            </div>
           
        </ContainerFeed>
    );
};

export default PostDetails;
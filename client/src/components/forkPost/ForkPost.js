import { Container, styled, TextField, Typography} from "@mui/material";
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

import { useParams } from "react-router-dom";

import '../markdownEditorPage/markdownEditorPage.css';

import { Calculate } from "@mui/icons-material";
 
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
    
    );
}

const ForkPost = () => {
    const [feeds, setFeeds]=useState([]);
    const [value, setValue]=useState();
    const profile=JSON.parse(localStorage.getItem('profile'));
    const {id}=useParams();
    const [post, setPost]=useState();

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
    

    const handlePost = async () => {
        const user=profile;
        console.log(user);
        if(!user) 
        {
            window.alert('please log in first');
        }
        else
        {
            var rt=await axios.post('http://localhost:5001/', {post:value, user:user});
            if(rt)
            {
                console.log(rt);
                window.alert(JSON.stringify(rt.data));
            }
        }
        
        // onClose(post);
      };    

    return (
        <ContainerFeed>
            <Button variant="outlined"  onClick={handlePost}>Create Post</Button>
            <div className="container" >
                <div className="textEditor">
                    <TextareaAutosize
                    minRows={10}
                    style={{ width:'100%', height:'100%'}}
                    value={value}
                    onChange={(e)=>{setValue(e.target.value)}}
                    />
                </div>
                
                <div className="markdownViewer">
                    <MarkdownViewer
                    value={value}/>
                </div>
            </div>
           
        </ContainerFeed>
    );
};

export default ForkPost;
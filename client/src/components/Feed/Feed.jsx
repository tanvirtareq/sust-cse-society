import { Container, styled, Typography} from "@mui/material";
import CardSimplePost from "../CardSimplePost/CardSimplePost";
import { useState, useEffect } from "react";
import axios from "axios";

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'


const ContainerFeed = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(10),
    // backgroundColor: 'yellow',
    height: '100%',
    overflow: 'auto',
    
}));

const Feed = () => {
    const [feeds, setFeeds]=useState([]);
    const profile=JSON.parse(localStorage.getItem('profile'));

    useEffect(()=>{
        axios.get('http://localhost:5001/').then((res)=>{
            console.log(res.data[0]);
            setFeeds(res.data);
            // var date=new Date(res.data[0].date);
            // date=date.toString();
            // date=
            // console.log(date);
        })
    }, []);

    const parseDate=(date)=>{
        console.log(date);
        var rt=new Date(date);
        rt=rt.toString();
        console.log(rt);
        return rt;
    }
    
    return (
        <ContainerFeed>
            {
                feeds.length?(feeds.map(d=>(<CardSimplePost 
                    postDetails={d}
                    currentUser={profile}
                    post={d.post} name={d.creator.userId} date={parseDate(d.date)} avaLink={d.creator.imageURL}
                    posts={feeds}
                    setPosts={setFeeds}
                     />))):(
                    <Typography>No Posts</Typography>
                )
            }

        </ContainerFeed>
    );
};

export default Feed;
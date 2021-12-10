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
    const tmp='# Hello, *world*!'
    return (
        <ContainerFeed>
            {
                feeds.length?(feeds.map(d=>(<CardSimplePost post={d.post} name={d.creator.userId} date={parseDate(d.date)} avaLink={d.creator.imageURL} />))):(
                    <Typography>No Posts</Typography>
                )
            }
            {/* <CardSimplePost 
            post="ke kovor tomader? Project kotodur? :-)"
            name = "Tanvir Rahman Tareq"
            date="5 December, 2021"  />

            <CardSimplePost 
            post="Amar basa BUET campus. MEOW"
            name = "Farina Tahsin Chowdhury"
            date="6 December, 2021"  />

            <CardSimplePost 
            post="Aaaaaaaaaaaaaaaaaaaaaaa..."
            name = "Farina Tahsin Chowdhury"
            date="6 December, 2021"  /> 
            
            <CardSimplePost 
            post="Seriously?"
            name = "Farina Tahsin Chowdhury"
            date="6 December, 2021"  /> 
            
            <CardSimplePost 
            post=":-)"
            name = "Farina Tahsin Chowdhury"
            date="6 December, 2021"  /> */}


        </ContainerFeed>
    );
};

export default Feed;
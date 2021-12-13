import { Box, Container, styled, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileCard from "../CardProfile/CardProfile";
import CardSimplePost from "../CardSimplePost/CardSimplePost";

const SearchResultContainer = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(10),
    height: '100%',
    overflow: 'auto',
}));

const SearchResult = () => {
    const {id}=useParams();
    const [people, setPeople]=useState([]);
    const [posts, setPosts]=useState([]);
    const profile = localStorage.getItem('profile');

    useEffect(()=>{
        const searchPeople=async ()=>{
            var rt=await axios.get('http://localhost:5001/searchUser/'+id);
            if(rt)
            {
                console.log(rt.data);
                setPeople(rt.data);
            }
        }
        const searchPost=async ()=>{
            var rt=await axios.get('http://localhost:5001/searchPost/'+id);
            if(rt)
            {
                console.log(rt.data);
                setPosts(rt.data);
            }
        }
        searchPeople();
        searchPost();
        // const getPosts=async ()=>{
        //     var rt=await axios.get('http://localhost:5001/')
        // }
    }, [id])

    return (
        <SearchResultContainer>
            <Typography sx={{paddingBottom: 2}} variant="h4"> Search Results </Typography>
            <hr />

            <Box sx={{ marginTop: 5 }}>
                <Typography variant="h6">People</Typography>
                {
                    people.map( p=>(<ProfileCard name={p?.userId} email={p?.email} user={p} />) )
                }
            </Box>
            <Box>
                <Typography variant="h6">Posts</Typography>
                {
                    posts.map(p=>( 
                        <CardSimplePost
                            currentUser={profile}
                            postDetails={p}
                            posts={posts}
                            setPosts={setPosts}
                            post={p.post}
                            name={p?.creator?.userId}
                            date={p?.createdAt}
                        />
                    ))
                }

                {/* <CardSimplePost
                    post="ke kovor tomader? Project kotodur? :-)"
                    name="Tanvir Rahman Tareq"
                    date="5 December, 2021" />
                <CardSimplePost
                    post="ke kovor tomader? Project kotodur? :-)"
                    name="Tanvir Rahman Tareq"
                    date="5 December, 2021" /> */}
            </Box>

        </SearchResultContainer>
    );
};

export default SearchResult;
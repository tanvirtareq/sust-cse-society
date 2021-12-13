import { Box, Container, styled, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileCard from "../CardProfile/CardProfile";
import CardSimplePost from "../CardSimplePost/CardSimplePost";

const PeopleContainer = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(10),
    height: '100%',
    overflow: 'auto',
}));

const People = () => {
    const [people, setPeople]=useState([]);
    const profile = JSON.parse(localStorage.getItem('profile'));

    useEffect(()=>{
        const getPeople=async ()=>{
            var rt=await axios.get('http://localhost:5001/users/');
            if(rt)
            {
                console.log(rt.data);
                setPeople(rt.data);
            }
        }
        getPeople();
    }, []);

    return (
        <PeopleContainer>
            {/* <Typography sx={{paddingBottom: 2}} variant="h4"> Search Results </Typography>
            <hr /> */}

            <Box sx={{ marginTop: 5 }}>
                {
                    people.map( p=>(<ProfileCard name={p?.userId} email={p?.email} user={p} />) )
                }
            </Box>
           
        </PeopleContainer>
    );
};

export default People;
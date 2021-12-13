import { Avatar, Box, Container, styled, Typography } from "@mui/material";
import { useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import CardSimplePost from "../CardSimplePost/CardSimplePost";

const ProfileContainer = styled(Container)(({theme}) => ({
    paddingTop: theme.spacing(10),
    height: '100%',
    overflow: 'auto',
}));

const ProfilePage = (props) => {
    const {id} =useParams();
    const [user, setUser] = useState();
    const [posts, setPosts]=useState();
    const profile=localStorage.getItem('profile');

    useEffect(()=>{
        const getUserDetails=async()=>{
            var ret=await axios.get('http://localhost:5001/user/'+id);
            if(ret)
            {
                setUser(ret.data);
            }
        }
        const getUserPosts=async()=>{
            var ret=await axios.get('http://localhost:5001');
            if(ret)
            {
                var temp=ret.data;
                console.log(temp);
                temp=temp.filter((e)=>(e?.creator?._id==id));
                setPosts(temp);
            }
        }
        getUserDetails();
        getUserPosts();

    }, []);

    return (
        <ProfileContainer>
            <Box>
                <Avatar alt={user?.userId} src={user?.imageUrl} sx={{ width: 100, height: 100 }} />
            </Box>
            <Box sx={{paddingTop: 3, paddingBottom: 3}}>
                <Typography variant="h6">{user?.userId}</Typography>
                <Typography variant="subtitle1">{user?.email}</Typography>
            </Box>
            <hr />
            <Typography sx={{paddingTop: 1, paddingBottom: 1}} variant="h5">Posts</Typography>
            <hr />
            <Box>
                {
                    (posts && posts.length)?(posts.map(d=>(<CardSimplePost 
                    postDetails={d}
                    currentUser={profile}
                    post={d.post} name={d.creator.userId} date={d.date} avaLink={d.creator.imageURL}
                    posts={posts}
                    setPosts={setPosts}
                     />))):(
                    <Typography>No Posts</Typography>
                )
                }
            </Box>
        </ProfileContainer>
    );
};

export default ProfilePage;
import { Event, Home, Logout, Message, Notifications, People, Poll } from "@mui/icons-material";
import History from "@mui/icons-material/History";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const ContainerLeftbar = styled(Box)(({ theme }) => ({
    //paddingRight: theme.spacing(1),
    // backgroundColor: 'yellow',
    paddingTop: theme.spacing(10),
    position: 'fixed'
}));

const BoxItem = styled(Box)(({ theme }) => ({
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    display: 'flex',
    width: '100%',
    //padding: theme.spacing(1),
    cursor: 'pointer'
}));

const ItemIconWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    padding: theme.spacing(0, 2)
}));




const LeftBar = () => {
    const navigate=useNavigate();
    const handleLogout=()=>{
        console.log('add');
        localStorage.removeItem("profile");
        // navigate('/');
        window.location.href='/';
    }
    const profile=localStorage.getItem('profile');

    return (
        <ContainerLeftbar>
            <Link to={'/'} >
                <BoxItem>
                    <ItemIconWrapper> <Home /> </ItemIconWrapper>
                    <Typography marginRight={'theme.spacing(2)'}>Home</Typography>
                </BoxItem>
            </Link>
            
            <BoxItem>
                <ItemIconWrapper> <People /> </ItemIconWrapper>
                <Typography>People</Typography>
            </BoxItem>
            <BoxItem>
                <ItemIconWrapper> <Event /> </ItemIconWrapper>
                <Typography>Events</Typography>
            </BoxItem>
            <Link to={'/polls'}>
                <BoxItem>
                    <ItemIconWrapper> <Poll /> </ItemIconWrapper>
                    <Typography>Poll</Typography>
                </BoxItem>
            </Link>
            <Link to={'/pollAnnouncements'}>
                <BoxItem>
                    <ItemIconWrapper> <Poll /> </ItemIconWrapper>
                    <Typography>Poll Announcement</Typography>
                </BoxItem>
            </Link>
            <Link to={'/poll-history'}>
                <BoxItem>
                    <ItemIconWrapper> <History /> </ItemIconWrapper>
                    <Typography> Poll History </Typography>
                </BoxItem>
            </Link>
            <BoxItem>   
                <ItemIconWrapper><Notifications /></ItemIconWrapper>
                <Typography>Notifications</Typography>
            </BoxItem>
            <BoxItem>
                <ItemIconWrapper><Message /></ItemIconWrapper>
                <Typography>Messages</Typography>
            </BoxItem>
            <BoxItem onClick={handleLogout}>
                <ItemIconWrapper><Logout /></ItemIconWrapper>
                <Typography>Log out</Typography>
            </BoxItem>
        </ContainerLeftbar>
    );
};

export default LeftBar;
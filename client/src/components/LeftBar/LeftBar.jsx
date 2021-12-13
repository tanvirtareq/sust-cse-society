import { Code, Event, Home, Logout, Message, Notifications, People, Poll } from "@mui/icons-material";
import History from "@mui/icons-material/History";
import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const ContainerLeftbar = styled(Container)(({ theme }) => ({
    //paddingRight: theme.spacing(1),
    // backgroundColor: 'yellow',
    paddingTop: theme.spacing(10),
    height: '100vh',
    position: 'sticky',
    top: 0,
    overflowY: 'auto'
}));

const BoxItem = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
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

const ResponsiveTypography = styled(Typography)(({theme}) => ({
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
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
                    <ResponsiveTypography marginRight={'theme.spacing(2)'}>Home</ResponsiveTypography>
                </BoxItem>
            </Link>
            <Link to={ '/people'} >
                <BoxItem>
                    <ItemIconWrapper> <People /> </ItemIconWrapper>
                    <ResponsiveTypography>People</ResponsiveTypography>
                </BoxItem>
            </Link>
            
            {/* <BoxItem>
                <ItemIconWrapper> <Event /> </ItemIconWrapper>
                <ResponsiveTypography>Events</ResponsiveTypography>
            </BoxItem> */}
            <Link to={'/polls'}>
                <BoxItem>
                    <ItemIconWrapper> <Poll /> </ItemIconWrapper>
                    <ResponsiveTypography>Poll</ResponsiveTypography>
                </BoxItem>
            </Link>
            <Link to={'/pollAnnouncements'}>
                <BoxItem>
                    <ItemIconWrapper> <Poll /> </ItemIconWrapper>
                    <ResponsiveTypography>Poll Announcement</ResponsiveTypography>
                </BoxItem>
            </Link>
            <Link to={'/poll-history'}>
                <BoxItem>
                    <ItemIconWrapper> <History /> </ItemIconWrapper>
                    <ResponsiveTypography> Poll History </ResponsiveTypography>
                </BoxItem>
            </Link>
            {/* <BoxItem>   
                <ItemIconWrapper><Notifications /></ItemIconWrapper>
                <ResponsiveTypography>Notifications</ResponsiveTypography>
            </BoxItem> */}
            <Link to={'/messenger'} >

                <BoxItem>
                    <ItemIconWrapper><Message /></ItemIconWrapper>
                    <ResponsiveTypography>Messages</ResponsiveTypography>
                </BoxItem>
            </Link>
            <Link to={'/markdownEditor'} >
                <BoxItem>
                    <ItemIconWrapper><Code /></ItemIconWrapper>
                    <ResponsiveTypography>Markdown Editor</ResponsiveTypography>
                </BoxItem>
            </Link>
            <Link to={'/sign-in'}>
                <BoxItem >
                    <ItemIconWrapper><Logout /></ItemIconWrapper>
                    <ResponsiveTypography>Log out</ResponsiveTypography>
                </BoxItem>
            </Link>
            
        </ContainerLeftbar>
    );
};

export default LeftBar;
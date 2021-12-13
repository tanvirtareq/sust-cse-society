import { AccountCircle, Message } from "@mui/icons-material";
import { Avatar, Card, CardHeader, IconButton, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CardProfile = styled(Card)(({ theme }) => ({
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing(2),
}));

const ProfileCard = (props) => {
    const { name, email,user } = props;
    const navigate=useNavigate();
    const handleProfileButton = () => {
        navigate('/profile/'+user?._id);
    }
    const handleMessageButton = () => {
        const profile=JSON.parse(localStorage.getItem('profile'));
        console.log(profile);
        if(profile?._id)
        {
            navigate('/messenger/'+profile?._id+'/'+user?._id);
        }

    }
    return (
        <CardProfile sx={{ maxWidth: 550 }}>
            <CardHeader
                avatar={<Avatar src={user?.imageUrl} />}
                action={
                    <>
                        <IconButton
                            sx={{ marginRight: 1 }}
                            onClick={handleMessageButton}>
                            <Message />
                        </IconButton>
                        <IconButton
                            sx={{ marginRight: 1 }}
                            onClick={handleProfileButton}>
                            <AccountCircle />
                        </IconButton>
                    </>

                }
                title={name}
                subheader={email}
            />

        </CardProfile>
    );
};

export default ProfileCard;
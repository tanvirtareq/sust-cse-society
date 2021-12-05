import { CommentOutlined, MoreVert, Share, ThumbDownOutlined, ThumbUpOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, IconButton, styled, Typography } from "@mui/material";

const CardPost = styled(Card)(({theme}) => ({
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing(2)  
}));

const CardSimplePost = (props) => {
    const {post, name, date} = props;
    return (
        <CardPost sx={{maxWidth: 550}} >
            <CardHeader 
            avatar={<Avatar src="/broken-image.jpg" />}
            action={
                <IconButton aria-label="settings">
                  <MoreVert />
                </IconButton>
            }
            title={name}
            subheader={date} />
            <CardContent>
                <Typography variant='body1'> {post}</Typography>
            </CardContent>
            <CardActions>
                <Box sx={{flexGrow: 1}} />
                <Button size="small" startIcon={<ThumbUpOutlined />}>Upvote</Button>
                <Box sx={{flexGrow: 1}} />
                <Button size="small" startIcon={<ThumbDownOutlined />}>Downvote</Button>
                <Box sx={{flexGrow: 1}} />
                <Button size="small" startIcon={<CommentOutlined />}>Comment</Button>
                <Box sx={{flexGrow: 1}} />
                <Button size="small" startIcon={<Share />}>Share</Button>
                <Box sx={{flexGrow: 1}} />
            </CardActions>
        </CardPost>
    );
};

export default CardSimplePost;
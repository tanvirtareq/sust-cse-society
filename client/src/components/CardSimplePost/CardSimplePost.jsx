import { CommentOutlined, MoreVert, Share, ThumbDownOutlined, ThumbUpOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, IconButton, styled, Typography } from "@mui/material";

const CardPost = styled(Card)(({ theme }) => ({
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing(2)
}));

const ResponsiveButton = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}));

const ResponsiveIconButton = styled(IconButton)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'none'
    }
}));

const CardSimplePost = (props) => {
    const { post, name, date, avatarLink } = props;
    console.log(date);
    return (
        <CardPost sx={{ maxWidth: 550 }} >
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
                <Box sx={{ flexGrow: 1 }} />
                <ResponsiveButton size="small" startIcon={<ThumbUpOutlined />}>Upvote</ResponsiveButton>
                <ResponsiveIconButton><ThumbUpOutlined /></ResponsiveIconButton>
                <Box sx={{ flexGrow: 1 }} />
                <ResponsiveButton size="small" startIcon={<ThumbDownOutlined />}>Downvote</ResponsiveButton>
                <ResponsiveIconButton><ThumbDownOutlined /></ResponsiveIconButton>
                <Box sx={{ flexGrow: 1 }} />
                <ResponsiveButton size="small" startIcon={<CommentOutlined />}>Comment</ResponsiveButton>
                <ResponsiveIconButton><CommentOutlined /></ResponsiveIconButton>
                <Box sx={{ flexGrow: 1 }} />
                <ResponsiveButton size="small" startIcon={<Share />}>Share</ResponsiveButton>
                <ResponsiveIconButton><Share /></ResponsiveIconButton>
                <Box sx={{ flexGrow: 1 }} />
            </CardActions>
        </CardPost>
    );
};

export default CardSimplePost;
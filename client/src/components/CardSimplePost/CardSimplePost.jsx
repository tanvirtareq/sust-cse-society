import { CommentOutlined, MoreVert, Share, ThumbDownOutlined, ThumbUpOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, IconButton, styled, Typography } from "@mui/material";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'


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
                <ReactMarkdown  children={post} remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}
                    components={{
                            code({node, inline, className, children, ...props}) {
                                const match = /language-(\w+)/.exec(className || '')
                                return !inline && match ? (
                                <SyntaxHighlighter
                                    children={String(children).replace(/\n$/, '')}
                                    style={dark}
                                    language={match[1]}
                                    PreTag="div"
                                    {...props}
                                />
                                ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                                )
                            }
                            }}
                />
                {/* <Typography variant='body1'> {post}</Typography> */}
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
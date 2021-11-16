import mongoose from 'mongoose';

const postSchema=mongoose.Schema({
    creator: String
});

const PostMessage=mongoose.model('postMessage', postSchema);

export default PostMessage;
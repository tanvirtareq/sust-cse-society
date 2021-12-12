import mongoose from 'mongoose';
import User from '../models/user.js';
var user=User;
const comentSchema=mongoose.Schema({
    postId:{type:mongoose.Schema.Types.ObjectId, ref:'Post'},
    creator: {type:mongoose.Schema.Types.ObjectId, ref:'user'},
    comment:String,
    upvoter:[{type:mongoose.Schema.Types.ObjectId, ref:'user'}],
    downvoter:[{type:mongoose.Schema.Types.ObjectId, ref:'user'}],
    reply:[{type:mongoose.Schema.Types.ObjectId, ref:'Comment'}],
    date:Date
},
{
    timestamps:true
}
);

export const Comment=mongoose.model('comment', comentSchema);

const postSchema=mongoose.Schema({
    creator: {type:mongoose.Schema.Types.ObjectId, ref:'user'},
    post:String,
    upvoter:[{type:mongoose.Schema.Types.ObjectId, ref:'user'}],
    downvoter:[{type:mongoose.Schema.Types.ObjectId, ref:'user'}],
    comment:[{type:mongoose.Schema.Types.ObjectId, ref:'Comment'}],
    date:Date
},
{
    timestamps:true
}
);

export const Post=mongoose.model('post', postSchema);

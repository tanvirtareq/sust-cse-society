import mongoose from 'mongoose';

import User from './user.js';
var user=User;

const conversationSchema=mongoose.Schema({
    members:[{type:mongoose.Schema.Types.ObjectId, ref:'user'}]
},
{
    timestamps:true
}

);

const Conversation=mongoose.model('conversation', conversationSchema);

export default Conversation;
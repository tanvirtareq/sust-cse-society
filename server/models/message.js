import mongoose from 'mongoose';

import User from '../models/user.js';
var user=User;

import Conversation from './conversation.js';
var conversation=Conversation;

const messageSchema=mongoose.Schema({
    conversationID:{type:mongoose.Schema.Types.ObjectId, ref:'conversation'},
    senderID:{type:mongoose.Schema.Types.ObjectId, ref:'user'},
    receiverID:{type:mongoose.Schema.Types.ObjectId, ref:'user'},
    text:String
},
{
    timestamps:true
}

);

const Message=mongoose.model('message', messageSchema);
export default Message;
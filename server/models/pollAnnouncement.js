import mongoose from 'mongoose';
import User from '../models/user.js';

var user=User;

var pollParticipantSchema=mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'user'},
    pollId:{type:mongoose.Schema.Types.ObjectId, ref:'PollAnnouncement'},
    pollCatagoryId:{type:mongoose.Schema.Types.ObjectId, ref:'PollCatagory'},
    transaction:String,
    vote:{type:Number, default:0}
});

export const PollParticipant=mongoose.model('PollParticipant', pollParticipantSchema);

var pollCatagorySchema=mongoose.Schema({
    catagory:String,
    pollId:{type:mongoose.Schema.Types.ObjectId, ref:'PollAnnouncement'},
    participant:[{type:mongoose.Schema.Types.ObjectId, ref:'PollParticipant'}],
    voter:[{type:mongoose.Schema.Types.ObjectId, ref:'user'}]
});


const pollAnnouncementSchema=mongoose.Schema({
    title:String,
    description: String,
    running:{type:Boolean, default:false},
    finished:{type:Boolean, default:false},
    catagory:[{type:mongoose.Schema.Types.ObjectId, ref:'PollCatagory'}]
});

export const PollCatagory=mongoose.model('PollCatagory', pollCatagorySchema);

const PollAnnouncement=mongoose.model('PollAnnouncement', pollAnnouncementSchema);

export default PollAnnouncement;
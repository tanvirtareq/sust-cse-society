import mongoose from 'mongoose';

var pollParticipantSchema=mongoose.Schema({
    userId:String,
    pollId:String,
    pollCatagoryId:String,
    transaction:String,
    vote:{type:Number, default:0}
});

export const PollParticipant=mongoose.model('pollParticipant', pollParticipantSchema);

var pollCatagorySchema=mongoose.Schema({
    catagory:String,
    pollId:String,
    participant:[String]
});


const pollAnnouncementSchema=mongoose.Schema({
    Announcement: String,
    Catagory:[String]
});

export const PollCatagory=mongoose.model('pollCatagory', pollCatagorySchema);

const PollAnnouncement=mongoose.model('pollAnnouncement', pollAnnouncementSchema);

export default PollAnnouncement;
import mongoose from 'mongoose';

const pollAnnouncementSchema=mongoose.Schema({
    Announcement: String
});

const PollAnnouncement=mongoose.model('pollAnnouncement', pollAnnouncementSchema);

export default PollAnnouncement;
import PollAnnouncement from "../models/pollAnnouncement.js";

export const createPollAnnouncement=(req, res)=>{
    console.log("aise");
    const post=req.body;
    console.log(Object.keys(post));
    const newAnnouncement=new PollAnnouncement(post);
    const tmp=Object.keys(post);
    PollAnnouncement.insertMany([{Announcement:tmp[0]}], (err)=>{

    });
}

export const getPollAnnouncement= async (req, res)=>{
    const Announcements=await PollAnnouncement.find();
    res.status(201).json(Announcements);    
}
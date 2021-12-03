import PollAnnouncement from "../models/pollAnnouncement.js";

export const createPollAnnouncement=(req, res)=>{
    // console.log("aise");
    const post=req.body;
    console.log(post.Catagory);
    var pollAnnouncement=PollAnnouncement({Announcement:post.Announcement});
    for (var i in post.Catagory)
    {
        // console.log(i);
        pollAnnouncement.Catagory.push({catagory:post.Catagory[i]});
    }
    PollAnnouncement.insertMany([pollAnnouncement], (err)=>{
    });
}

export const getPollAnnouncement= async (req, res)=>{
    const Announcements=await PollAnnouncement.find();
    res.status(201).json(Announcements);    
}

export const getPollDetails=async (req, res)=>{
    // console.log(req.params);
    var pollId=(req.params.id);
    console.log(pollId);
    var id='61a898479c7a82427d0e45b0';
    PollAnnouncement.findById(pollId, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            // console.log("Result : ", docs);
            res.status(201).json(docs);
        }
    });
    // const details=await PollAnnouncement.findById(pollId);
    // res.status(201).json(details);
    // PollAnnouncement.findById(pollId)
    // .then(
    //     (doc)=>{
    //         console.log(doc);
    //     }
    // )
}

export const applyForPoll=(req, res)=>{
    // console.log(req.body);
    var catagory=req.body.catagory;
    var transaction=req.body.transaction;
    var userId=req.body.user._id;
    var pollId=req.body.pollId;
    console.log(catagory+' '+transaction+' '+userId+' '+pollId);
    PollAnnouncement.find({_id:pollId}, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            // docs.Catagory.catagory()
            console.log(docs);
            res.status(201).json(docs);
        }
    });
}
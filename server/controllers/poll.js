import PollAnnouncement, { PollCatagory, PollParticipant } from "../models/pollAnnouncement.js";

export const createPollAnnouncement=(req, res)=>{
    // console.log("aise");
    const post=req.body;
    // console.log(post);
    var pollAnnouncement=PollAnnouncement({title:post.title, description:post.description});
    console.log(post.catagory);
    for (var i in post.catagory)
    {
        // console.log(i);
        var pollCatagory=PollCatagory({catagory:post.catagory[i].label, pollId:pollAnnouncement._id});
        pollAnnouncement.catagory.push(pollCatagory._id);
        PollCatagory.insertMany([pollCatagory], (err)=>{
            if(err) console.log(err);
        });
        // pollAnnouncement.Catagory.push({catagory:post.Catagory[i]});
    }
    PollAnnouncement.insertMany([pollAnnouncement], (err)=>{
    });
    res.status(201).json(pollAnnouncement);
}

export const getPollAnnouncement= async (req, res)=>{

    PollAnnouncement.find({running:false, finished:false})
    .populate('catagory')
    .exec((err, poll)=>{
        if(err) console.log(err);
        else{
            console.log(poll);
        }
        res.status(201).json(poll);
    });


    // PollAnnouncement.find().then((docs)=>{
    //     console.log(docs);
    //     var ret=[];
    //     for(var i in docs)
    //     {
    //        var announcement=docs[i].Announcement;
    //        var catagory=[];
    //        for(var j in docs[i].Catagory)
    //        {
    //         console.log(docs[i].Catagory[j]);
    //            PollCatagory.findById(docs[i].Catagory[j]).then((doc2)=>{
    //                     console.log(doc2);
    //                     // catagory.push(doc2.catagory);
    //            });
    //            console.log("ses");
                
    //             // catagory.push(docs[i].Catagory[j]);
    //        }
    //        console.log(catagory);
    //        ret.push({announcement:announcement, catagory:catagory});
    //     }
    //     res.status(201).json(ret);
    // });
    // // const Announcements=await PollAnnouncement.find();
    // // res.status(201).json(Announcements);    
}

export const getPollDetails=async (req, res)=>{
    // console.log(req.params);
    var pollId=(req.params.id);
    console.log(pollId);
    var id='61a898479c7a82427d0e45b0';
    PollAnnouncement.findById(pollId)
    .populate('Catagory')
    .exec((err, poll)=>{
        if(err)
        {

        }
        else{
            res.status(201).json(poll);
        }
    });
    // PollAnnouncement.findById(pollId, function (err, docs) {
    //     if (err){
    //         console.log(err);
    //     }
    //     else{
    //         // console.log("Result : ", docs);
    //         res.status(201).json(docs);
    //     }
    // });
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
    console.log(req.body);
    var catagory=req.body.catagory;
    var userId=req.body.user._id;
    var pollId=req.body.pollId;
    PollParticipant.find({userId:userId, pollId:pollId})
    .exec((err, docs)=>{
        if(err)
        {

        }else if(docs.length==0)
        {
            PollCatagory.findOne({catagory:catagory, pollId:pollId})
            .exec((err, catagoryDetails)=>{
                if(err)
                {

                }
                else{
                    var pollCatagoryId=catagoryDetails._id;
                    var pollParticipant=PollParticipant({userId:userId, pollId:pollId, pollCatagoryId:pollCatagoryId});
                    console.log(pollParticipant);
                    PollParticipant.insertMany([pollParticipant]);
                    catagoryDetails.participant.push(pollParticipant._id);
                    console.log(catagoryDetails);
                    catagoryDetails.save();

                    // var participant=catagoryDetails.participant;
                    // participant.push(pollParticipant._id);
                    // console.log(participant);
                    // PollCatagory.save({_id:pollCatagoryId, participant:participant});
                    // PollCatagory.findOne({_id:pollCatagoryId})
                    // .exec((err, docs)=>{
                    //     if(err)
                    //     {

                    //     }
                    //     else 
                    //     {
                    //         console.log(docs);
                    //     }
                    // });
                    // PollCatagory.updateOne({_id:pollCatagoryId}, {participant:participant});
                }
            });
        }
    });
    // console.log(catagory+' '+transaction+' '+userId+' '+pollId);
    
    // var pollParticipant=PollParticipant({userId:userId, pollId:pollId, pollCatagoryId:})
    // PollAnnouncement.find({_id:pollId}, function (err, docs) {
    //     if (err){
    //         console.log(err);
    //     }
    //     else{
    //         // docs.Catagory.catagory()
    //         console.log(docs);
    //         res.status(201).json(docs);
    //     }
    // });
}

export const getRunningElections=(req, res)=>{
    // console.log(req.body);
    PollAnnouncement.find({running:true})
    .populate({path:'catagory', populate:{path:'participant', populate:{path:'userId'}}})
    .exec((err, polls)=>{
        if(err)
        {

        }else{
            res.status(200).json(polls);
        }
    })

    
    // PollCatagory.find({'participant':{$exists:true, $ne:[]} })
    // .populate('pollId')
    // .populate({path:'participant', populate:{path:'userId'}})
    // .exec((err, polls)=>{
    //     if(err)
    //     {

    //     }else{
    //         res.status(200).json(polls);
    //     }
    // })
    // res.status(200).json(req.body);
}

export const handleVote=(req,res)=>{
    // console.log(req.body);
    // console.log(req.body);
    const vote=req.body.vote;
    const userId=req.body.userId;
    const catagoryId=req.params.id;
    PollCatagory.findById(catagoryId)
    .populate({path:'participant', populate:{path:'userId'}})
    .exec((err, docs)=>{
        if(err)
        {
            // console.log(err);
        }
        else
        {
            if(!docs.voter.includes(userId))
            {
                var tt=docs.participant.find(d=>(d.userId.userId==vote)).vote;
                var id=docs.participant.find(d=>(d.userId.userId==vote))._id;
                console.log(id);
                PollParticipant.findById(id)
                .exec((err, part)=>{
                    var tmp=part.vote;
                    console.log(tmp);
                    part.vote=tmp+1;
                    console.log(part);
                    docs.voter.push(userId);
                    part.save();
                    docs.save();
                });
                // docs.participant.find(d=>(d.userId.userId==vote)).vote=tt+1;
                // console.log(docs.participant.find(d=>(d.userId.userId==vote)));
                // docs.save();
            }
            
        }
    });
}

export const publishPollResult=(req, res)=>{
    console.log(req.params.id);
    const pollId=req.params.id;
    PollAnnouncement.findOneAndUpdate({_id:pollId}, {finished:true, running:false}).exec((err, docs)=>{
        res.status(201).json(docs);
    });
    // PollAnnouncement.findOne({_id:pollId}).exec((err, docs)=>{
    //     if(err) console.log(err);
    //     else
    //     {
    //         console.log(docs);
    //     }
    // });
}

export const getPollResults=(req, res)=>{
    // console.log(req.body);
    // console.log("ase");
    PollAnnouncement.find({finished:true})
    .populate({path:'catagory', populate:{path:'participant', populate:{path:'userId'} } })
    .populate({path:'catagory', populate:{path:'voter', populate:{path:'userId'} } })
    .exec((err, docs)=>{
        if(err) {

        }
        else
        res.status(200).json(docs);
    })
}

export const startPoll=async (req, res)=>{
    // console.log(req.params);
    const pollId=req.params.id;
    console.log(pollId);
    var rt=await PollAnnouncement.findByIdAndUpdate(pollId, {running:true});
    if(rt)
    {
        res.status(200).json(rt);
    }
}

// import Conversation from "../models/conversation.js";
import Conversation from "../models/conversation.js";

export const getConversations=async (req, res)=>{
    try {
        const conversation = await Conversation.find({
          members: { $in: [req.params.userId] },
        })
        .populate('members');
        res.status(200).json(conversation);
      } catch (err) {
        res.status(500).json(err);
      }
} 

export const getConversation=async (req,res)=>{
    console.log('ase');
    console.log(req.params.firstUserID);
    try {
        const conversation = await Conversation.findOne({
          members: { $all: [req.params.firstUserID, req.params.secondUserID] },
        });
        if(conversation)
        {
            const conv = await Conversation.findOne({
                members: { $all: [req.params.firstUserID, req.params.secondUserID] },
            }).populate('members');
            if(conv) res.status(200).json(conv);
        }
            
        else 
        {
            var rt=await Conversation.create({members:[req.params.firstUserID, req.params.secondUserID]});
            if(rt)
            {
                const conv = await Conversation.findOne({
                    members: { $all: [req.params.firstUserID, req.params.secondUserID] },
                }).populate('members');
                if(conv) res.status(200).json(conv);
            }
        }
      } catch (err) {
        res.status(500).json(err);
    }
    
}
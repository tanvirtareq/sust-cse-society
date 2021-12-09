import Message from "../models/message.js";

export const createMessage=async (req, res)=>{
    const {conversationID, senderID, receiverID, text}=req.body;
    const newMessage = new Message(req.body);

    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getMessages=async (req, res)=>{
    try {
        const messages = await Message.find({
          conversationID: req.params.conversationID,
        });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
}
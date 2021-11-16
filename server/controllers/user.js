import User from "../models/user.js";

export const getUser=async (req, res)=>{
    try {
        console.log("adl");
    } catch (error) {
    }
}

export const findOrCreateUser=async (req, res)=>{
    const post=req.body;
    const newPost=new User(post);
    try {
        await newPost.save();
        res.status(201).json(newPost); 
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}
import PostMessage from "../models/postMessage.js";

export const getPosts=async (req, res)=>{
    console.log(req.cookies);
    console.log(req.signedCookies);
    try {
        const postMessage= await PostMessage.find();
        // console.log(postMessage);
        res.status(200).json(postMessage);
    } catch (error) {
        res.status(404).json({message: postMessage});
    }
}

export const createPost=async (req, res)=>{
    const post=req.body;
    console.log("creat post "+JSON.stringify(post));
    const newPost=new PostMessage(post);
    try {
        await newPost.save();
        res.status(201).json(newPost); 
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}
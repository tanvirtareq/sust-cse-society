// import PostMessage from "../models/postMessage.js";

// export const getPosts=async (req, res)=>{
//     console.log(req.cookies);
//     console.log(req.signedCookies);
//     try {
//         const postMessage= await PostMessage.find();
//         // console.log(postMessage);
//         res.status(200).json(postMessage);
//     } catch (error) {
//         res.status(404).json({message: postMessage});
//     }
// }

// export const createPost=async (req, res)=>{
//     const post=req.body;
//     console.log("creat post "+JSON.stringify(post));
//     const newPost=new PostMessage(post);
//     try {
//         await newPost.save();
//         res.status(201).json(newPost); 
//     } catch (error) {
//         res.status(409).json({message: error.message});
//     }
// }

import { Post, Comment } from "../models/post.js";

export const getPosts=async (req, res)=>{
    
    var ret=await Post.find().populate({path:'creator'});
    if(ret)
    {
        res.status(201).json(ret);
    }

    // try {
    //     const postMessage= await PostMessage.find();
    //     // console.log(postMessage);
    //     res.status(200).json(postMessage);
    // } catch (error) {
    //     res.status(404).json({message: postMessage});
    // }
}


export const createPost=async (req, res)=>{
    const {post, user}=req.body;
    // console.log("creat post "+JSON.stringify(post));
    const newPost=new Post({post:post, creator:user._id, date:new Date()});
    console.log(newPost);
    try {
        var rt=await newPost.save();
        if(rt) 
        {
            res.status(201).json('Post Shared Successfully');
        } 
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}
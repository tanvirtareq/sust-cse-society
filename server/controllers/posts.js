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
    
    var ret=await Post.find()
    .sort({"createdAt":-1})
    .populate({path:'creator'});
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
            var ret=await newPost.populate('creator');
            if(ret)
            {
                res.status(201).json(ret);
            }
            
        } 
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const getPostDetails=async (req, res)=>{
    const postID=req.params.id;
    var ret=await Post.findById(postID).populate({path:'creator'});
    if(ret)
    {
        res.status(200).json(ret);
    }
}

export const editPost=async (req, res)=>{
    const postID=req.params.id;
    const {post}=req.body;
    const ret=await Post.findByIdAndUpdate(postID, {post:post});
    if(ret)
    {
        res.status(200).json("Updated Successfully");
    }
}

export const deletePost=async (req, res)=>{
    const ret=await Post.findOneAndDelete(req.body);
    if(ret)
    {
        res.status(200).json('successfully deleted');
    }
}

export const searchPost=async (req, res)=>{
    const {searchText}=req.params;
    console.log(searchText);
    var rgx=new RegExp(searchText);
    console.log(rgx);
    var ret=await Post.find({post: {$regex:  rgx, $options: 'i'} })
    .sort({"createdAt":-1})
    .populate({path:'creator'});
    if(ret)
    {
        res.status(200).json(ret);
    }
}
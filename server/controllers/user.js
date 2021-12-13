import User from "../models/user.js";
import  express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';

export const getUser = async (req, res) => {
    try {
        // await User.findAndDeleteById('61964ab8e09832815dbee81a');
        console.log("oise");
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
    }
}

export const getUserData = async (req, res) => {
    try {
        console.log(req.params);
        const id=req.params.userId;
        const user = await User.findOne({_id: id});
        res.status(200).json(user);
    } catch (error) {
    }
}

export const findOrCreateUser = async (req, res) => {
    console.log("aise");
    const google = req.body;
    console.log(google.profileObj.name);
    const user = { userId: google.profileObj.name, googleId: google.profileObj.googleId, imageUrl: google.profileObj.imageUrl, email: google.profileObj.email, google: google };
    // const newUser=new User(user);
    // console.log(newUser);
    // await newUser.save();
    const docs = await User.find({googleId: user.googleId});
    // console.log(docs);
    if(docs.length==0)
    {
        await User.create(user);
    }
    const newUser=await User.findOne({googleId: user.googleId});
    res.status(200).json(newUser);
    // return user;
    // const token = user.generateAuthToken;
    // console.log(token);
    // docs.map(doc => doc.name).sort();
    // await User.find({ 'googleId': user.googleId }, async (err, docs) => {
    //     console.log(docs);
    //     if (docs.length==0) {
    //         const newUser = new User(user);
    //         try {
    //             await newUser.save();
    //             res.status(201).json(newUser);
    //         } catch (error) {
    //             res.status(409).json({ message: error.message });
    //         }
    //     }

    // });
}

export const searchUser=async(req, res)=>{
    const {searchText}=req.params;
    console.log(searchText);
    var rgx=new RegExp(searchText);
    console.log(rgx);
    var ret=await User.find({userId: {$regex:  rgx, $options: 'i'} });
    if(ret)
    {
        res.status(200).json(ret);
    }
}
import User from "../models/user.js";

export const getUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
    }
}

export const getUserData = async (req, res) => {
    try {
        console.log(req.params);
        const googleId=req.params.userId;
        const user = await User.findOne({googleId: googleId});
        res.status(200).json(user);
    } catch (error) {
    }
}

export const findOrCreateUser = async (req, res) => {
    const google = req.body;
    console.log(google.profileObj.name);
    const user = { userId: google.profileObj.name, googleId: google.profileObj.googleId, imageUrl: google.profileObj.imageUrl, email: google.profileObj.email, google: google };
    const newUser=new User(user);
    // console.log(newUser);
    // await newUser.save();
    const docs = await User.find({googleId: user.googleId});
    // console.log(docs);
    if(docs.length==0)
    {
        await User.create(user);
    }
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
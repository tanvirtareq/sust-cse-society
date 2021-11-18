import mongoose from 'mongoose';

const userSchema=mongoose.Schema({
    userId: String,
    googleId: String,
    imageUrl: String,
    email: String,
    google: Object
});

const User=mongoose.model('user', userSchema);

export default User;
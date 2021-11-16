import mongoose from 'mongoose';

const userSchema=mongoose.Schema({
    creator: String
});

const User=mongoose.model('user', userSchema);

export default User;
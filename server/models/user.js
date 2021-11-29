import mongoose from 'mongoose';

const userSchema=mongoose.Schema({
    userId: String,
    admin:{
        type:Boolean,
        default: false
    },
    googleId: String,
    imageUrl: String,
    email: String,
    google: Object
});

userSchema.methods.generateAuthToken = function() {
    console.log("ekhane");
    const token = jwt.sign(
        {
            _id: this._id,
        },
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: "15m" }
    );
    return token;
};

const User=mongoose.model('user', userSchema);

export default User;
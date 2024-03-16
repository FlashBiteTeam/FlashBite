import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
    },
    otp:{
        type: String,
        required: [true, 'OTP required']
    },
    creado:{
        type: Date
    },
    expira:{
        type: Date
    }
});

export const OTPModel = mongoose.model('OTP', OTPSchema)
import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
    }
});

export const OTPModel = mongoose.model('OTP', OTPSchema)
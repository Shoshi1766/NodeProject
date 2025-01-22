import mongoose, { Schema, model } from "mongoose";

export const UserSchema = mongoose.Schema({
    tz: {type:String,required: true , unique: true},
    fullName: {type:String,required: true},
    password: String,
    role: {type:String, default: "User"},
    email: { type: String, validate: /\S+@\S+\.\S+/ },
    startDate: {type: Date, default: new Date()}

})

export const UserModel = mongoose.model('user', UserSchema);

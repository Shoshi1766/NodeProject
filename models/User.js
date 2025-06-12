import mongoose, { Schema, model } from "mongoose";


//יצירת טבלת משתמשים
export const UserSchema = mongoose.Schema({
    tz: {type:String,required: true , unique: true},
    fullName: {type:String,required: true, unique: true},
    password: String,
    role: {type:String, default: "User"},
    email: { type: String, validate: /\S+@\S+\.\S+/ ,required:false},
    startDate: {type: Date, default: new Date()}

})

export const UserModel = mongoose.model('user', UserSchema);

import mongoose, { Schema,model } from "mongoose";

//יצירת טבלת פרחים
export const FlowerSchema= mongoose.Schema({

name:{type:String,required: true},
description: String,
price: {type:Number,required:true},
flowerContain: {type:[String], required:true},
img: String
})

export const FlowerModel=mongoose.model("Flower",FlowerSchema);

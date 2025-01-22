import mongoose, { Schema, model, Types } from "mongoose";
import { UserSchema } from "./User.js";
import { FlowerSchema } from './Flower.js'

const OrderSchema = mongoose.Schema({
    //id אוטומטי
    userId: { type: String , required: true },
    products: {
        type: [
            {
                _id: { type: Types.ObjectId, ref: "Flower", required: true },
                name: { type: String, required: true },
                price: { type: Number, required: true },
                qty: { type: Number, default: 1 }
            }
        ], required: true
    },
    odrerDate: { type: Date, default: new Date() },
    targetDate: { type: Date },
    address: { type: String, required: true },
    isSend: { type: Boolean, default: false },
    sendingPrice: { type: Number, default: 100 },
    finalPrice: {
        type: Number,
        default: function () { 
            let sum = 0;
            this.products.forEach(product => {
                sum += product.price * product.qty;
            });
            return sum + this.sendingPrice; 
        }
    }

})

export const OrderModel = mongoose.model("order", OrderSchema);
import mongoose, { Schema } from "mongoose";

const GiftSchema = new Schema({
    title: {"type": String, "required": true},
    brand: {"type": String, "required": true},
    price: {"type": Number, default: 0.00, "required": true},
    purchased: {"type": Boolean, default: false, "required": true},
    kids: {"type": [String], "required": false},
},{ timestamps: true });

export const GiftModel = mongoose.model('Gift', GiftSchema);

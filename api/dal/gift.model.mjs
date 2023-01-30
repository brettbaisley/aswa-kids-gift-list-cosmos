import mongoose, { Schema } from "mongoose";

const GiftSchema = new Schema({
    title: {"type": String, "required": true},
    brand: {"type": String, "required": true},
    price: {"type": mongoose.Types.Decimal128, default: 0.00, "required": true},
    purchased: {"type": Boolean, default: false, "required": true},
    kids: {"type": [String], "required": false},
    created: { type: Date, default: Date.now }
});

export const GiftModel = mongoose.model('Gift', GiftSchema);

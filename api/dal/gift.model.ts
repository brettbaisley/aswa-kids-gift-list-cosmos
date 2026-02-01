import mongoose, { Schema, Document } from "mongoose";

interface IGift extends Document {
    title: string;
    brand: string;
    price: number;
    purchased: boolean;
    kids?: string[];
    imageUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const GiftSchema = new Schema<IGift>({
    title: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, default: 0.00, required: true },
    purchased: { type: Boolean, default: false, required: true },
    kids: { type: [String], required: false },
    imageUrl: { type: String, required: false, default: '' },
}, { timestamps: true });

export const GiftModel = mongoose.model<IGift>('Gift', GiftSchema);

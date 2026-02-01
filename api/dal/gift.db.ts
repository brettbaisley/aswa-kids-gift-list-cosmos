import { ReadPreference } from 'mongodb';
import mongoose from 'mongoose';
import { GiftModel } from '../dal/gift.model';
import type { Document } from 'mongoose';

interface IGift extends Document {
    _id: string;
    title: string;
    brand: string;
    price: number;
    purchased: boolean;
    kids?: string[];
    imageUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Initialize MongoDB connection
mongoose.set('strictQuery', false);
const cosmosDbConnectionString = process.env.CosmosDbConnectionString;
if (!cosmosDbConnectionString) {
    throw new Error('Missing CosmosDbConnectionString in environment settings. Add it to api/local.settings.json (Values) before starting the Functions host.');
}
mongoose.connect(cosmosDbConnectionString);

export const getGiftsDB = async (): Promise<IGift[]> => {
    return await GiftModel.find({}).read(ReadPreference.NEAREST).exec();
};

export const getGiftDB = async (id: string): Promise<IGift | null> => {
    return await GiftModel.findById(id).read(ReadPreference.NEAREST).exec();
};

export const createGiftDB = async (data: Partial<IGift>): Promise<IGift> => {
    return await GiftModel.create(data);
};

export const deleteGiftDB = async (id: string): Promise<any> => {
    return await GiftModel.deleteOne({ _id: id }).exec();
};

export const updateGiftDB = async (id: string, data: Partial<IGift>): Promise<IGift | null> => {
    return await GiftModel.findByIdAndUpdate(id, data, { new: true }).exec();
};

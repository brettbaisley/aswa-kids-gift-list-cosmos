import { ReadPreference } from 'mongodb';
import mongoose from 'mongoose';
import { GiftModel } from '../dal/gift.model.mjs';


mongoose.connect(process.env["CosmosDbConnectionString"]);


export const getGiftsDB = async () => {
    return await GiftModel.find({}).read(ReadPreference.NEAREST).exec();
}

export const getGiftDB = async (id) => {
    return await GiftModel.findById(id).read(ReadPreference.NEAREST).exec();
}

export const createGiftDB = async (data) => {
    return await GiftModel.create(data);
}

export const deleteGiftDB = async (id) => {
    return await GiftModel.deleteOne({id}).exec();
}

export const updateGiftDB = async (id, data) => {
    return await GiftModel.findByIdAndUpdate(id, data, {new: true}).exec()
}
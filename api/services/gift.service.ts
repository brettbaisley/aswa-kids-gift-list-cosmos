import { getGiftsDB, getGiftDB, createGiftDB, deleteGiftDB, updateGiftDB } from '../dal/gift.db';
import type { Document } from 'mongoose';

interface IGift extends Document {
    _id: string;
    title: string;
    brand: string;
    price: number;
    purchased: boolean;
    kids?: string[];
    imageUrl?: string;
    createdBy?: string;
    purchasedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

class GiftService {
    static getGifts = async (): Promise<IGift[]> => {
        // Get all gifts, and return array of all data
        return await getGiftsDB();
    };

    static getGift = async (id: string): Promise<IGift | null> => {
        // Get the specified gift, and return its data
        return await getGiftDB(id);
    };

    static createGift = async (data: Partial<IGift>): Promise<IGift> => {
        // Create a new gift with the given data
        return await createGiftDB(data);
    };

    static updateGift = async (id: string, data: Partial<IGift>): Promise<IGift | null> => {
        // Update the gift, and return the gifts new data
        return await updateGiftDB(id, data);
    };

    static deleteGift = async (id: string): Promise<any> => {
        // Delete the gift, and return something like: { "acknowledged": true, "deletedCount": 1 }
        return await deleteGiftDB(id);
    };
}

export default GiftService;

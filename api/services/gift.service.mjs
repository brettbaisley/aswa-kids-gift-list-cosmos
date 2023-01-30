import { getGiftsDB, getGiftDB, createGiftDB, deleteGiftDB, updateGiftDB } from '../dal/gift.db.mjs';

class GiftService {

    static getGifts = async () => {
        // Get all gifts, and return array of all data
        // return gifts;
        return await getGiftsDB();
    }
    
    static getGift = async (id) => {
        // Get the specified gift, and return its data
        return await getGiftDB(id);
    }

    static createGift = async (data) => {
        // Create a new gift with the given data
        return await createGiftDB(data);
    }

    static updateGift = async (id, data) => {
        // Update the gift, and return the gifts new data
        return await updateGiftDB(id, data);
    }

    static deleteGift = async (id) => {
        // Delete the gift, and return something like: { "acknowledged": true, "deletedCount": 1 }
        return await deleteGiftDB(id);
    }
}

export default GiftService;
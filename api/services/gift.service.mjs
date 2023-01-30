import gifts from '../dal/data.mjs';

class GiftService {

    static getGifts = async ({req,res}) => {
        // Check if req.params.id was supplied, and if so, only return that one gift
        if (req.params.id) {
            const singleData = gifts.filter(gift => gift._id == req.params.id);
            return singleData;
        }
        // Else, return all gifts
        console.log(`TEST: ${JSON.stringify(gifts)}`)
        return gifts;
    }


    static deleteGifts = async ({req,res}) => {
        // Check if req.params.id was supplied, and if so, delete the corresponding gift
        if (req.params.id) {
            const filteredData = gifts.filter(gift => gift._id != req.params.id);
            return filteredData;
        }
    }
}

export default GiftService;
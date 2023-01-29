const data = require('./data');

class GiftService {

    static getGifts = async ({req,res}) => {
        // Check if req.params.id was supplied, and if so, only return that one gift
        if (req.params.id) {
            const singleData = data.filter(gift => gift._id == req.params.id);
            return singleData;
        }
        // Else, return all gifts
        return data;
    }


    static deleteGifts = async ({req,res}) => {
        // Check if req.params.id was supplied, and if so, delete the corresponding gift
        if (req.params.id) {
            const filteredData = data.filter(gift => gift._id != req.params.id);
            return filteredData;
        }
    }
}

module.exports = GiftService;
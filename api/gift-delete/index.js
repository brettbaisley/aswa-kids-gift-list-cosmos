const GiftService = require('../services/gifts.service.js');

module.exports = async function (context, req) {
    try {
        data = await GiftService.deleteGifts(context);
        context.res = {
            body: data,
            contextType: 'application/json'
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: "ERROR: Unable to DELETE gifts"
        }
    }
}
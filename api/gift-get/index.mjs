import GiftService from '../services/gifts.service.mjs';

export default async (context, req) => {
    try {
        const data = await GiftService.getGifts(context);
        context.res = {
            body: data,
            contextType: 'application/json'
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: `ERROR: Unable to GET gifts: ${error}`
        }
    }
}
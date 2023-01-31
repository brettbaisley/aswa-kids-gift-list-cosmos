// This acts as the 'controller' in the routes/controller/services/data access/model/db model

import GiftService from '../services/gift.service.mjs';

export default async (context, req) => {
    try {
        const data = await GiftService.getGifts();
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
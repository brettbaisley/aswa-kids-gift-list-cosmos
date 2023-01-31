// This acts as the 'controller' in the routes/controller/services/data access/model/db model

import GiftService from '../services/gift.service.mjs';

export default async (context, req) => {
    try {
        const gift = await GiftService.updateGift(context.req.params.id, context.req.body);
        context.res = {
            body: gift,
            contextType: 'application/json'
        };
    
    } catch (error) {
        context.res = {
            status: 500,
            body: `ERROR: Unable to POST gift: ${error}`
        }
    }
}
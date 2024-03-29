// This acts as the 'controller' in the routes/controller/services/data access/model/db model

import GiftService from '../services/gift.service.mjs';

export default async (context, req) => {
    const id = context.req.params.id;

    if (!id) {
        context.res = {
            status: 500,
            body: `ERROR: ID not specified`
        }
    }
    
    try {
        const data = await GiftService.getGift(id);
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
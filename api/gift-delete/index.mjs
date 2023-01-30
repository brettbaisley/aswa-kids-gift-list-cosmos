import GiftService from '../services/gift.service.mjs';

export default async (context, req) => {
    try {
        const id = context.req.params.id;

        if (!id) {
            context.res = {
                status: 500,
                body: `ERROR: ID not specified`
            }
        }
        
     
        const data = await GiftService.deleteGift(id);
        context.res = {
            body: data,
            contextType: 'application/json'
        };
    
    } catch (error) {
        context.res = {
            status: 500,
            body: `ERROR: Unable to DELETE gift with id of ${id}: ${error}`
        }
    }
}
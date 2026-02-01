// This acts as the 'controller' in the routes/controller/services/data access/model/db model

import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import GiftService from '../services/gift.service';

export default async function httpTrigger(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log('HTTP trigger function processed a request.');
    
    const id = req.params?.id;

    if (!id) {
        return {
            status: 400,
            body: `ERROR: ID not specified`,
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
    
    try {
        const data = await GiftService.getGift(id);
        return {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (error) {
        context.log(`Error: ${error}`);
        return {
            status: 500,
            body: `ERROR: Unable to GET gifts: ${error}`,
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
}

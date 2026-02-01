// This acts as the 'controller' in the routes/controller/services/data access/model/db model

import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import GiftService from '../services/gift.service';

export default async function httpTrigger(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log('HTTP trigger function processed a request.');
    
    try {
        const bodyText = await req.text();
        const body = JSON.parse(bodyText);
        const newGift = await GiftService.createGift(body);
        return {
            body: JSON.stringify(newGift),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    
    } catch (error) {
        context.log(`Error: ${error}`);
        return {
            status: 500,
            body: `ERROR: Unable to POST gift: ${error}`,
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
}

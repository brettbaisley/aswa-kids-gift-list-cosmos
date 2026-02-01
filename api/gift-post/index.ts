// This acts as the 'controller' in the routes/controller/services/data access/model/db model

import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import GiftService from '../services/gift.service';
import { getUserIdentity } from '../utils/auth';

export default async function httpTrigger(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log('HTTP trigger function processed a request.');
    
    try {
        // Extract user identity from Azure Static Web Apps headers
        const userIdentity = getUserIdentity(req);
        
        // Require authentication to create gifts
        if (!userIdentity) {
            return {
                status: 401,
                body: JSON.stringify({ error: 'Authentication required to create gifts' }),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }
        
        const bodyText = await req.text();
        const body = JSON.parse(bodyText);
        
        // Add createdBy to the gift data
        const giftData = {
            ...body,
            createdBy: userIdentity
        };
        
        const newGift = await GiftService.createGift(giftData);
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

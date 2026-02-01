// This acts as the 'controller' in the routes/controller/services/data access/model/db model

import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import GiftService from '../services/gift.service';
import { getUserIdentity, canModifyGift } from '../utils/auth';

export default async function httpTrigger(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log('HTTP trigger function processed a request.');
    
    try {
        const id = req.params?.id;
        
        // Extract user identity from Azure Static Web Apps headers
        const userIdentity = getUserIdentity(req);
        
        if (!userIdentity) {
            return {
                status: 401,
                body: JSON.stringify({ error: 'Authentication required to update gifts' }),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }
        
        // Get the existing gift to check ownership
        const existingGift = await GiftService.getGift(id);
        
        if (!existingGift) {
            return {
                status: 404,
                body: JSON.stringify({ error: 'Gift not found' }),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }
        
        // Check if user is authorized (creator or admin)
        if (!canModifyGift(userIdentity, existingGift.createdBy)) {
            return {
                status: 403,
                body: JSON.stringify({ error: 'You do not have permission to update this gift. Only the creator or administrators can modify gifts.' }),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }
        
        const bodyText = await req.text();
        const body = JSON.parse(bodyText);
        const gift = await GiftService.updateGift(id, body);
        return {
            body: JSON.stringify(gift),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    
    } catch (error) {
        context.log(`Error: ${error}`);
        return {
            status: 500,
            body: `ERROR: Unable to UPDATE gift: ${error}`,
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
}

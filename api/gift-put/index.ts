// This acts as the 'controller' in the routes/controller/services/data access/model/db model

import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import GiftService from '../services/gift.service';
import { getUserIdentity, canModifyGift, isAdmin } from '../utils/auth';

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
        
        // Check if user is authorized to modify the gift
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
        
        // Check purchase authorization: only the person who marked it as purchased can unmark it (or admins)
        if (existingGift.purchased && !body.purchased) {
            // User is trying to unmark the gift as not purchased
            const isPurchaser = existingGift.purchasedBy === userIdentity;
            const isUserAdmin = isAdmin(userIdentity);
            
            if (!isPurchaser && !isUserAdmin) {
                return {
                    status: 403,
                    body: JSON.stringify({ 
                        error: `Only the person who marked this gift as purchased (${existingGift.purchasedBy}) or administrators can mark it as not purchased.` 
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
            }
        }
        
        // If marking as purchased, set the purchasedBy field
        if (!existingGift.purchased && body.purchased) {
            body.purchasedBy = userIdentity;
        }
        
        // If unmarking as purchased, clear the purchasedBy field
        if (existingGift.purchased && !body.purchased) {
            body.purchasedBy = null;
        }
        
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

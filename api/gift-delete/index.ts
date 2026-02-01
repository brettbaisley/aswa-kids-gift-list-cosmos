import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import GiftService from '../services/gift.service';
import { getUserIdentity, isAdmin } from '../utils/auth';

export default async function httpTrigger(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log('HTTP trigger function processed a request.');
    
    try {
        const id = req.params?.id;

        if (!id) {
            return {
                status: 400,
                body: JSON.stringify({ error: 'ID not specified' }),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }
        
        // Extract user identity from Azure Static Web Apps headers
        const userIdentity = getUserIdentity(req);
        
        if (!userIdentity) {
            return {
                status: 401,
                body: JSON.stringify({ error: 'Authentication required to delete gifts' }),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }
        
        // Only admins can delete gifts
        if (!isAdmin(userIdentity)) {
            return {
                status: 403,
                body: JSON.stringify({ error: 'Only administrators can delete gifts' }),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }
        
        const data = await GiftService.deleteGift(id);
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
            body: JSON.stringify({ error: `Unable to DELETE gift with id of ${req.params?.id}: ${error}` }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
}

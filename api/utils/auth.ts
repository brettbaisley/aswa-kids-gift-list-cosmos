import { HttpRequest } from "@azure/functions";

/**
 * Extracts user identity from Azure Static Web Apps authentication headers
 * Azure SWA provides user info in the x-ms-client-principal header as base64-encoded JSON
 * 
 * Supported authentication providers:
 * - GitHub: userDetails contains the GitHub username
 * - Google: userDetails contains the email address
 * - Microsoft AAD: userDetails contains the email address
 * 
 * @param req - The HTTP request object
 * @returns The user's identity (userDetails) or null if not authenticated
 */
export function getUserIdentity(req: HttpRequest): string | null {
    try {
        const header = req.headers.get('x-ms-client-principal');
        
        if (!header) {
            return null;
        }

        // Decode the base64-encoded JSON
        const decoded = Buffer.from(header, 'base64').toString('utf-8');
        const clientPrincipal = JSON.parse(decoded);
        
        // Return the userDetails field (GitHub username, Google email, or AAD email)
        return clientPrincipal.userDetails || null;
    } catch (error) {
        console.error('Error extracting user identity:', error);
        return null;
    }
}

/**
 * Checks if a user is an administrator
 * Admins are defined in the ADMIN_USERS environment variable as a comma-separated list
 * 
 * @param userIdentity - The user's identity (username or email)
 * @returns true if the user is an admin, false otherwise
 */
export function isAdmin(userIdentity: string | null): boolean {
    if (!userIdentity) {
        return false;
    }

    const adminUsers = process.env.ADMIN_USERS?.split(',').map(u => u.trim()) || [];
    return adminUsers.includes(userIdentity);
}

/**
 * Checks if a user is authorized to modify a gift
 * Users can modify a gift if they are the creator or an admin
 * 
 * @param userIdentity - The user's identity (username or email)
 * @param giftCreator - The creator of the gift
 * @returns true if authorized, false otherwise
 */
export function canModifyGift(userIdentity: string | null, giftCreator?: string): boolean {
    if (!userIdentity) {
        return false;
    }

    // Allow if user is admin
    if (isAdmin(userIdentity)) {
        return true;
    }

    // Allow if user is the creator
    if (giftCreator && userIdentity === giftCreator) {
        return true;
    }

    return false;
}

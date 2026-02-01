# Admin Authorization Implementation

This document describes the admin-only CRUD operations that have been added to the gift list application.

## Changes Summary

### Backend Changes

1. **Gift Model** - Added `createdBy` field to track gift ownership
   - Updated `api/dal/gift.model.ts`
   - Updated `api/dal/gift.model.mjs`
   - Updated `api/services/gift.service.ts`
   - Updated `app/src/types/gift.ts`

2. **Authorization Utilities** - Created shared auth helper functions
   - New file: `api/utils/auth.ts`
   - Functions: `getUserIdentity()`, `isAdmin()`, `canModifyGift()`

3. **API Endpoints** - Added authorization checks to all CRUD endpoints
   - `api/gift-post/index.ts` - Requires authentication, captures `createdBy`
   - `api/gift-put/index.ts` - Requires creator or admin permission (403 on failure)
   - `api/gift-delete/index.ts` - Requires admin permission only (403 on failure)

4. **Configuration** - Added admin user list
   - Updated `api/local.settings.json` with `ADMIN_USERS` environment variable

### Frontend Changes

1. **AuthContext** - Enhanced with admin status
   - Updated `app/src/context/AuthContext.tsx`
   - Added `isAdmin` boolean calculated from static admin list
   - Changed API from array destructuring to object destructuring

2. **UI Components** - Added delete functionality
   - Updated `app/src/components/GiftItem.tsx` - Added delete button (admin only)
   - Updated `app/src/components/GiftGrid.tsx` - Pass delete handler
   - Updated `app/src/components/Registry.tsx` - Implement delete handler with error handling
   - Updated `app/src/components/GiftItem.css` - Styled delete button

3. **Service Layer** - Enhanced error handling
   - Updated `app/src/services/GiftService.mjs` - Proper error handling for delete operations

### Migration

- Created `api/migrate-gifts.ts` - Script to set `createdBy='brettbaisley'` for existing gifts

## Authorization Rules

### Create (POST)
- **Who can create**: Any authenticated user
- **Behavior**: Automatically sets `createdBy` to the authenticated user's identity

### Read (GET)
- **Who can read**: Everyone (no restrictions)

### Update (PUT)
- **Who can update**: Gift creator OR admin users
- **Error**: Returns 403 with message: "You do not have permission to update this gift. Only the creator or administrators can modify gifts."

### Delete (DELETE)
- **Who can delete**: Admin users only
- **Error**: Returns 403 with message: "Only administrators can delete gifts"

## Admin Users

Admins are defined in the `ADMIN_USERS` environment variable as a comma-separated list:

**Current admins:**
- `brettbaisley` (GitHub username)
- `enerlise615@gmail.com` (Microsoft/Google email)

## Deployment Steps

### 1. Run Migration Script (One-time)

Before deploying, run the migration script to set `createdBy` for existing gifts:

```bash
cd api
npm install
npx tsx migrate-gifts.ts
```

This will set `createdBy='brettbaisley'` for all existing gifts in the database.

### 2. Update Azure Static Web Apps Configuration

Add the `ADMIN_USERS` environment variable in the Azure Portal:

1. Go to Azure Portal → Your Static Web App
2. Navigate to **Configuration** → **Application settings**
3. Add new setting:
   - **Name**: `ADMIN_USERS`
   - **Value**: `brettbaisley,enerlise615@gmail.com`
4. Click **Save**

### 3. Deploy Code

Deploy your code as usual. The changes will take effect after deployment.

## Testing

### Test Authentication

1. **Anonymous User**: Should see gifts but no edit/delete buttons
2. **Authenticated Non-Admin**: Should see edit button on their own gifts only, no delete button
3. **Admin User**: Should see edit and delete buttons on all gifts

### Test Authorization Errors

1. Try to update another user's gift (should get 403)
2. Try to delete a gift as non-admin (should get 403 with error message)
3. Error messages should appear as alerts on the frontend

## User Identity Format

Azure Static Web Apps provides user identity in the `x-ms-client-principal` header:

```json
{
  "identityProvider": "github",
  "userId": "...",
  "userDetails": "brettbaisley",  // This is what we use
  "userRoles": ["authenticated"]
}
```

For GitHub login: `userDetails` contains the GitHub username
For Microsoft/Google login: `userDetails` contains the email address

## Troubleshooting

### Delete button not showing up?
- Verify you're logged in as an admin user
- Check browser console for errors
- Verify `ADMIN_USERS` environment variable is set correctly

### Getting 403 errors?
- Check that you're authenticated (logged in)
- Verify your user identity matches one in `ADMIN_USERS`
- Check browser console and server logs for the actual user identity being sent

### Migration script fails?
- Verify `CosmosDbConnectionString` is set in environment
- Check database connection string is correct
- Ensure you have network access to Cosmos DB

# Authentication Setup

This application uses Azure Static Web Apps built-in authentication, which provides easy integration with multiple identity providers.

## Currently Configured Providers

### 1. GitHub
- **Login URL**: `/.auth/login/github`
- **User Identity**: GitHub username
- **Setup**: Works out-of-the-box with Azure SWA

### 2. Google
- **Login URL**: `/.auth/login/google`
- **User Identity**: Email address
- **Setup**: Works out-of-the-box with Azure SWA

### 3. Microsoft Azure Active Directory (AAD)
- **Login URL**: `/.auth/login/aad`
- **User Identity**: Email address
- **Setup**: Works out-of-the-box with Azure SWA

## Passwordless Email Authentication

To implement passwordless email authentication (magic links), you have several options:

### Option 1: Azure AD B2C (Recommended for Azure deployments)

Azure AD B2C supports email one-time passcode (OTP) authentication.

**Setup Steps:**
1. Create an Azure AD B2C tenant
2. Configure email OTP as an identity provider
3. Update `staticwebapp.config.json` to use Azure AD B2C:
   ```json
   {
     "auth": {
       "identityProviders": {
         "azureActiveDirectory": {
           "registration": {
             "openIdIssuer": "https://yourtenant.b2clogin.com/yourtenant.onmicrosoft.com/v2.0/",
             "clientIdSettingName": "AAD_CLIENT_ID",
             "clientSecretSettingName": "AAD_CLIENT_SECRET"
           }
         }
       }
     }
   }
   ```
4. Configure application settings in Azure portal with your B2C credentials

**Documentation**: [Azure AD B2C Email OTP](https://learn.microsoft.com/en-us/azure/active-directory-b2c/add-identity-provider)

### Option 2: Custom Authentication Provider

For more control or non-Azure deployments, you can implement a custom auth provider:

1. **Choose a service**:
   - [Auth0](https://auth0.com/) - Supports passwordless email
   - [Supabase](https://supabase.com/) - Built-in magic link support
   - [Firebase Authentication](https://firebase.google.com/products/auth) - Email link authentication

2. **Implementation**:
   - Disable SWA built-in auth in `staticwebapp.config.json`
   - Implement custom auth endpoints in the API
   - Update `api/utils/auth.ts` to validate custom JWT tokens
   - Update frontend to use custom login flows

### Option 3: Twitter Authentication

Azure SWA also supports Twitter authentication, currently disabled in the config.

**To enable**:
1. Remove the Twitter blocking rule from `staticwebapp.config.json`
2. Add Twitter login link to `Login.tsx`
3. Configure Twitter OAuth app in Azure portal

## User Identity and Admin Management

User identity is stored in the `x-ms-client-principal` header (base64-encoded JSON) and contains:
- `userDetails`: Username or email depending on the provider
- `userId`: Provider-specific user ID
- `identityProvider`: The authentication provider used

Admin users are configured via the `ADMIN_USERS` environment variable (comma-separated list of usernames/emails).

## Testing Authentication Locally

When running locally with the Azure SWA CLI:

```bash
npm run start-dev
```

Visit: `http://localhost:4280/.auth/login/github` (or google/aad)

The SWA CLI simulates the authentication flow for local development.

## Additional Resources

- [Azure Static Web Apps Authentication](https://learn.microsoft.com/en-us/azure/static-web-apps/authentication-authorization)
- [Configure Authentication Providers](https://learn.microsoft.com/en-us/azure/static-web-apps/authentication-custom)
- [Azure AD B2C](https://learn.microsoft.com/en-us/azure/active-directory-b2c/overview)

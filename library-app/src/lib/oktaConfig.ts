import { OAuthResponseType } from "@okta/okta-auth-js";

export const oktaConfig = {
  clientId: "0oanvuus4ewXnxxoY5d7", // A unique identifier for your application registered with Okta
  issuer: "https://dev-71713489.okta.com/oauth2/default", // Okta authorization server that issues tokens
  redirectUri: "http://localhost:5173/login/callback", // URL to redirect to after authentication
  scopes: [
    // user information your app can access
    "openid", // Basic authentication
    "profile", // User profile information (name, etc.)
    "email",
  ],
  pkce: true, // Proof Key for Code Exchange against authorization code interception for SPA
  disableHttpsCheck: true, // Bypasses HTTPS requirements for development
  responseType: 'code' as OAuthResponseType, // Authorization code flow
  useInteractionCodeFlow: false,
  useClassicEngine: true
};

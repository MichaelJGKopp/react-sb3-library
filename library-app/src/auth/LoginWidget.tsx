import { useOktaAuth } from "@okta/okta-react";
import { SpinnerLoading } from "../layouts/Utils/SpinnerLoading";
import { Tokens } from "@okta/okta-auth-js";
import { Navigate } from "react-router-dom";

// Import the DEBUG constant to match the fetchData pattern
import { DEBUG } from "../layouts/Utils/fetchData";
import { OktaSignInWidget } from "./OktaSignInWidget";

interface LoginWidgetProps {
  config: {
    clientId: string;
    issuer: string;
    redirectUri: string;
    scopes: string[];
    pkce: boolean;
    disableHttpsCheck: boolean;
  }; // Replace with more specific type if available
}

export const LoginWidget = ({ config }: LoginWidgetProps) => {
  const { oktaAuth, authState } = useOktaAuth();

  const onSuccess = (tokens: Tokens) => {
    if (DEBUG) console.log("[OKTA Auth] Login successful");
    oktaAuth.handleLoginRedirect(tokens);
  };

  const onError = (err: Error) => {
    if (DEBUG) console.error("[OKTA Auth] Sign in error:", err);
    console.log("Sign in error: ", err);
  };

  if (!authState) {
    if (DEBUG) console.log("[OKTA Auth] Loading auth state...");
    return <SpinnerLoading />;
  }

  return authState.isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <div>
      <OktaSignInWidget
        config={config}
        onSuccess={onSuccess}
        onError={onError}
      />
    </div>
  );
};

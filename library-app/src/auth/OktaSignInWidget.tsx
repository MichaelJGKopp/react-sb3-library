import { useEffect, useRef } from "react";
import OktaSignIn from "@okta/okta-signin-widget";
import "@okta/okta-signin-widget/css/okta-sign-in.min.css";
import { Tokens } from "@okta/okta-auth-js";

interface OktaSignInWidgetProps {
  config: {
    clientId: string;
    issuer: string;
    redirectUri: string;
    scopes: string[];
    pkce: boolean;
    disableHttpsCheck: boolean;
  };
  onSuccess: (tokens: Tokens) => void;
  onError: (error: Error) => void;
}

export const OktaSignInWidget = ({
  config,
  onSuccess,
  onError,
}: OktaSignInWidgetProps) => {
  const widgetRef = useRef<never>(null);

  useEffect(() => {
    if (!widgetRef.current) return;

    const widget = new OktaSignIn(config);

    widget
      .showSignInToGetTokens({
        el: widgetRef.current,
      })
      .then(onSuccess)
      .catch(onError);

    return () => {
      widget.remove();
    };
  }, [config, onSuccess, onError]);

  return <div ref={widgetRef} />;
};

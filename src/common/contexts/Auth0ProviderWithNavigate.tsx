import { Auth0Provider } from "@auth0/auth0-react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const AUTH0_POST_ACTION_KEY = "wakeup_detact.auth0.post_action";

const DEFAULT_AUTH0_DOMAIN = "dev-orv5kn6l3e4cvvd3.us.auth0.com";
const DEFAULT_AUTH0_CLIENT_ID = "aNsfVfmbjXXEjW18mlwfzfKHck8RgOyy";

export const Auth0ProviderWithNavigate = ({
  children,
}: {
  children: ReactNode;
}) => {
  const navigate = useNavigate();

  const domain =
    (import.meta.env.VITE_AUTH0_DOMAIN as string | undefined) ??
    DEFAULT_AUTH0_DOMAIN;
  const clientId =
    (import.meta.env.VITE_AUTH0_CLIENT_ID as string | undefined) ??
    DEFAULT_AUTH0_CLIENT_ID;
  const audience = (import.meta.env.VITE_AUTH0_AUDIENCE as string | undefined) || undefined;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        ...(audience ? { audience } : {}),
      }}
      onRedirectCallback={(appState) => {
        const postAuthAction = (appState as { postAuthAction?: string } | undefined)
          ?.postAuthAction;
        if (postAuthAction) {
          sessionStorage.setItem(AUTH0_POST_ACTION_KEY, postAuthAction);
        }

        const returnTo = (appState as { returnTo?: string } | undefined)?.returnTo;
        navigate(returnTo ?? window.location.pathname, { replace: true });
      }}
    >
      {children}
    </Auth0Provider>
  );
};

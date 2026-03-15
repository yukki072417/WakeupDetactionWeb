import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./features/App/App.tsx";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain="dev-orv5kn6l3e4cvvd3.us.auth0.com"
        clientId="aNsfVfmbjXXEjW18mlwfzfKHck8RgOyy"
        authorizationParams={{ redirect_uri: window.location.origin }}
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </StrictMode>
);

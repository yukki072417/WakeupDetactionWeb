import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./features/App/App.tsx";
import { AuthProvider } from "./common/contexts/AuthProvider.tsx";
import { Auth0ProviderWithNavigate } from "./common/contexts/Auth0ProviderWithNavigate.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </StrictMode>
);

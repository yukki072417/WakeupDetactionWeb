import { useAuth0 } from "@auth0/auth0-react";
import { FcGoogle } from "react-icons/fc";
import "./AuthenticateButtons.css";

const GoogleLogin = () => {
  const { loginWithRedirect, isLoading } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: "login",
        connection: "google-oauth2",
      },
      appState: {
        postAuthAction: "login",
        returnTo: "/",
      },
    });
  };

  return (
    <button
      className="google-auth-button"
      type="button"
      onClick={handleLogin}
      disabled={isLoading}
      aria-label="Googleでログイン"
    >
      <span className="google-auth-icon" aria-hidden="true">
        <FcGoogle />
      </span>
      Googleでログイン
    </button>
  );
};

export default GoogleLogin;

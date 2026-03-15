import { useAuth0 } from "@auth0/auth0-react";
import { FcGoogle } from "react-icons/fc";
import "./AuthenticateButtons.css";

const GoogleSignup = () => {
  const { loginWithRedirect, isLoading } = useAuth0();

  const signup = (): void => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: "signup",
        connection: "google-oauth2",
      },
      appState: {
        postAuthAction: "signup",
        returnTo: "/signup/profile",
      },
    });
  };

  return (
    <button
      className="google-auth-button"
      type="button"
      onClick={signup}
      disabled={isLoading}
      aria-label="Googleでサインアップ"
    >
      <span className="google-auth-icon" aria-hidden="true">
        <FcGoogle />
      </span>
      Googleでサインアップ
    </button>
  );
};

export default GoogleSignup;

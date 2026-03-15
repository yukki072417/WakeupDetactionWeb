import { useAuth0 } from "@auth0/auth0-react";

const GoogleLogin = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: "login",
        connection: "google-oauth2",
      },
    });
  };

  return (
    <>
      <button onClick={handleLogin}>Googleアカウントでサインアップ</button>
      <p>{isAuthenticated == true ? user?.email : "UnAuthenticated"}</p>
    </>
  );
};

export default GoogleLogin;

import { useAuth0 } from "@auth0/auth0-react";

const UniversalLogin = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        login_hint: "email",
      },
    });
  };

  return (
    <>
      <button onClick={handleLogin}>ログイン</button>
      <p>{isAuthenticated == true ? user?.email : "UnAuthenticated"}</p>
    </>
  );
};

export default UniversalLogin;

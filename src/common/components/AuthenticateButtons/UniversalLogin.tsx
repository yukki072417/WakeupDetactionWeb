import { useNavigate } from "react-router-dom";

const UniversalLogin = () => {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate("/login")}>ログイン</button>
    </>
  );
};

export default UniversalLogin;

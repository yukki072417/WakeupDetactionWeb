import { useNavigate } from "react-router-dom";

const UniversalSignup = () => {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate("/signup")}>サインアップ</button>
    </>
  );
};

export default UniversalSignup;

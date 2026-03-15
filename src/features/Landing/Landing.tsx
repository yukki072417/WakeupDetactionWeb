import "./Landing.css";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../../common/components/Header/Header";
import { useAuth } from "../../common/contexts/authContext";

const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isVerifying } = useAuth();

  if (isVerifying) return null;
  if (isAuthenticated) return <Navigate to="/home" replace />;

  return (
    <>
      <Header />
      <main className="landing">
        <div className="landing-hero">
          <h1 className="landing-title">はじめまして</h1>
          <p className="landing-description">睡眠と起床を友達と共有しよう</p>
        </div>
        <button className="landing-button-signup" onClick={() => navigate("/signup")}>
          新規登録
        </button>
        <button className="landing-button-login" onClick={() => navigate("/login")}>
          ログイン
        </button>
      </main>
    </>
  );
};

export default Landing;

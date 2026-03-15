import "./SignUp.css";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Header from "../../common/components/Header/Header";
import { useAuth } from "../../common/contexts/authContext";
import { GoogleSignup } from "../../common/components/AuthenticateButtons";

const SignUp = () => {
  const navigate = useNavigate();
  const { isAuthenticated, signup } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/" replace />;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== passwordConfirm) {
      setError("パスワードが一致しません");
      return;
    }

    setLoading(true);
    try {
      await signup({ email, password, nickname });
      navigate("/", { replace: true });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "サインアップに失敗しました"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="signup-form">
        <div className="top-introduction">
          <h1 className="top-title">はじめまして</h1>
          <p className="top-description">睡眠と起床を友達と共有しよう</p>
        </div>
        <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
          <label style={{ display: "grid", gap: 4 }}>
            <span>名前</span>
            <input
              value={nickname}
              className="text-box"
              onChange={(e) => setNickname(e.target.value)}
              autoComplete="nickname"
            />
          </label>
          <label style={{ display: "grid", gap: 4 }}>
            <span>メールアドレス</span>
            <input
              value={email}
              className="text-box"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </label>
          <label style={{ display: "grid", gap: 4 }}>
            <span>パスワード</span>
            <input
              type="password"
              value={password}
              className="text-box"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </label>
          <label style={{ display: "grid", gap: 4 }}>
            <span>パスワード（確認）</span>
            <input
              type="password"
              value={passwordConfirm}
              className="text-box"
              onChange={(e) => setPasswordConfirm(e.target.value)}
              autoComplete="new-password"
            />
          </label>
          {error ? <p style={{ color: "crimson" }}>{error}</p> : null}
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "作成中..." : "アカウント作成"}
          </button>
          <div className="line">または</div>
          <GoogleSignup />
        </form>
        <p className="navigation-login">
          すでにアカウントをお持ちですか?
          <Link className="navigation-login" to="/login">
            ログイン
          </Link>
        </p>
      </main>
    </>
  );
};

export default SignUp;

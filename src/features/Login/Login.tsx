import "./Login.css";
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Header from "../../common/components/Header/Header";
import { useAuth } from "../../common/contexts/authContext";
import { GoogleLogin } from "../../common/components/AuthenticateButtons";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/home";
  const { isAuthenticated, isVerifying, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (isVerifying) {
    return (
      <>
        <Header />
        <main className="login-form">
          <div className="top-introduction">
            <h1 className="top-title">認証中...</h1>
            <p className="top-description">しばらくお待ちください</p>
          </div>
        </main>
      </>
    );
  }

  if (isAuthenticated) return <Navigate to="/home" replace />;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "ログインに失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="login-form">
        <div className="top-introduction">
          <h1 className="top-title">おかえりなさい</h1>
          <p className="top-description">睡眠と起床を友達と共有しよう</p>
        </div>
        <form
          className=""
          onSubmit={onSubmit}
          style={{ display: "grid", gap: 12 }}
        >
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
              autoComplete="current-password"
            />
          </label>
          <p className="navigation-signup">
            <Link className="navigation-signup" to="/signup">
              パスワードをお忘れですか？
            </Link>
          </p>
          {error ? <p style={{ color: "crimson" }}>{error}</p> : null}
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "ログイン中..." : "ログイン"}
          </button>

          <div className="line">または</div>
          <GoogleLogin />
        </form>
      </main>
    </>
  );
};

export default Login;

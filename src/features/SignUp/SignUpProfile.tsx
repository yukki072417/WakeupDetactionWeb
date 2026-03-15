import "./SignUpProfile.css";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "../../common/components/Header/Header";
import { useAuth } from "../../common/contexts/authContext";

type UniversalSignupState = {
  email: string;
  password: string;
};

const isUniversalState = (value: unknown): value is UniversalSignupState => {
  if (!value || typeof value !== "object") return false;
  const obj = value as Record<string, unknown>;
  return typeof obj.email === "string" && typeof obj.password === "string";
};

const SignUpProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated: isAuth0Authenticated } = useAuth0();
  const { signup, completeSocialSignup } = useAuth();

  const universalState = isUniversalState(location.state) ? location.state : null;
  const mode: "universal" | "social" = universalState ? "universal" : "social";

  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !userId.trim()) {
      setError("名前とユーザーIDを入力してください");
      return;
    }

    if (mode === "social" && !isAuth0Authenticated) {
      setError("先にGoogleでサインアップしてください");
      return;
    }

    setLoading(true);
    try {
      if (mode === "universal") {
        if (!universalState) {
          setError("サインアップ情報が見つかりません。最初からやり直してください。");
          return;
        }

        await signup({
          email: universalState.email,
          password: universalState.password,
          username: username.trim(),
          userId: userId.trim(),
        });
      } else {
        await completeSocialSignup({
          username: username.trim(),
          userId: userId.trim(),
        });
      }

      navigate("/", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "登録に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="signup-profile-form">
        <div className="top-introduction">
          <h1 className="top-title">プロフィール登録</h1>
          <p className="top-description">
            {mode === "universal"
              ? "名前とユーザーIDを入力してアカウント登録を完了します"
              : "名前とユーザーIDを入力して登録を完了します"}
          </p>
        </div>

        <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
          <label style={{ display: "grid", gap: 4 }}>
            <span>名前</span>
            <input
              value={username}
              className="text-box"
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="name"
            />
          </label>
          <label style={{ display: "grid", gap: 4 }}>
            <span>ユーザーID</span>
            <input
              value={userId}
              className="text-box"
              onChange={(e) => setUserId(e.target.value)}
              autoComplete="off"
            />
          </label>

          {error ? <p style={{ color: "crimson" }}>{error}</p> : null}
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "登録中..." : "登録する"}
          </button>
        </form>

        <p className="navigation-login">
          <Link className="navigation-login" to="/signup">
            戻る
          </Link>
        </p>
      </main>
    </>
  );
};

export default SignUpProfile;

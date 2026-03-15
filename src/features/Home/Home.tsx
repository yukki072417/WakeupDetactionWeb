import "./Home.css";
import Header from "../../common/components/Header/Header";
import Footer from "../../common/components/Footer/Footer";
import HomeProfile from "./components/HomeProfile";
import { useAuth } from "../../common/contexts/authContext";
import { Link } from "react-router-dom";
const Home = () => {
  const { isAuthenticated, session, logout } = useAuth();

  return (
    <>
      <Header />
      <main>
        {isAuthenticated ? (
          <>
            <HomeProfile />
            <div className="home-authenticated">
              <p className="home-userid">user_id: {session?.userId}</p>
              <button className="home-logout" onClick={logout}>
                ログアウト
              </button>
            </div>
          </>
        ) : (
          <section className="home-auth">
            <h2 className="home-auth-title">Wakeup Detactへようこそ</h2>
            <p className="home-auth-description">
              睡眠と起床を友達と共有しよう
            </p>
            <div className="home-auth-actions">
              <Link className="home-auth-primary" to="/signup">
                サインアップ
              </Link>
              <Link className="home-auth-secondary" to="/login">
                ログイン
              </Link>
            </div>
          </section>
        )}
      </main>
      <Footer active="home" />
    </>
  );
};

export default Home;

import "./Home.css";
import Header from "../../common/components/Header/Header";
import Footer from "../../common/components/Footer/Footer";
import HomeProfile from "./components/HomeProfile";
import {
  UniversalSignup,
  UniversalLogin,
} from "../../common/components/AuthenticateButtons";
import { useAuth } from "../../common/contexts/authContext";
const Home = () => {
  const { isAuthenticated, session, logout } = useAuth();

  return (
    <>
      <Header />
      <main>
        <HomeProfile />
        {isAuthenticated ? (
          <div style={{ padding: 16 }}>
            <p style={{ marginBottom: 8 }}>user_id: {session?.userId}</p>
            <button onClick={logout}>ログアウト</button>
          </div>
        ) : (
          <>
            <UniversalLogin />
            <UniversalSignup />
          </>
        )}
      </main>
      <Footer active="home" />
    </>
  );
};

export default Home;

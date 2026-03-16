import "./Home.css";
import Header from "../../common/components/Header/Header";
import Footer from "../../common/components/Footer/Footer";
import Declaration from "./components/Declaration";
import HomeProfile from "./components/HomeProfile";
import FriendList from "./components/FriendList";
import { getProfile } from "../../common/api/profile";
import { useEffect, useState } from "react";
import { useAuth } from "../../common/contexts/authContext";

const Home = () => {
  const [userName, setUserName] = useState<string>("");
  const auth = useAuth();

  useEffect(() => {
    async function fetchProfile(): Promise<void> {
      if (auth.session == null) return;
      const response = await getProfile({
        accessToken: auth.session.accessToken,
        userId: auth.session.userId,
      });

      if (response.success == true) {
        setUserName(response.username);
      }
    }
    fetchProfile();
  });
  return (
    <>
      <Header />
      <main>
        <HomeProfile name={userName} status="sleepy" profileImage="aaa" />
        <Declaration />
        <FriendList />
      </main>
      <Footer active="home" />
    </>
  );
};

export default Home;

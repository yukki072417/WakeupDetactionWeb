import "./Home.css";
import Header from "../../common/components/Header/Header";
import Footer from "../../common/components/Footer/Footer";
const Home = () => {
  return (
    <>
      <Header />
      <main>
        <HomeProfile name="あまれってぃー" status="sleepy" profileImage="aaa" />
        <Declaration />
        <FriendList />
      </main>
      <Footer active="home" />
    </>
  );
};

export default Home;

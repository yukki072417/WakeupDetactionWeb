import "./Home.css";
import Header from "../../common/components/Header/Header";
import Footer from "../../common/components/Footer/Footer";
import HomeProfile from "./components/HomeProfile";
const Home = () => {
  return (
    <>
      <Header />
      <main>
        <HomeProfile />
      </main>
      <Footer active="home" />
    </>
  );
};

export default Home;

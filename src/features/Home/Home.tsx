import "./Home.css";
import Header from "../../common/components/Header/Header";
import Footer from "../../common/components/Footer/Footer";
import HomeProfile from "./components/HomeProfile";
import UniversalSignup from "../../common/components/AuthenticateButtons/UniversalSignup";
const Home = () => {
  return (
    <>
      <Header />
      <main>
        <HomeProfile />
        <UniversalSignup />
      </main>
      <Footer active="home" />
    </>
  );
};

export default Home;

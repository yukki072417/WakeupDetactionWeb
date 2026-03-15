import "./Setting.css";
import Header from "../../common/components/Header/Header";
import Footer from "../../common/components/Footer/Footer";
import SettingProfile from "./components/SettingProfile";
import ChangeProfile from "./components/ChangeProfile";
import Options from "./components/Options.tsx";

const Setting = () => {
  return (
    <>
      <Header />
      <main>
        <SettingProfile />
        <ChangeProfile />
        <Options />
      </main>
      <Footer active="setting" />
    </>
  );
};

export default Setting;

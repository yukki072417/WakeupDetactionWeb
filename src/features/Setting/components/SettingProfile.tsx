import "./SettingProfile.css";
import ProfileIcon from "../../../assets/icon_profile.png";

const SettingProfile = () => {
  return (
    <div className="setting_profile">
      <img src={ProfileIcon} alt="" />
      <div>
        <h2>うえだあまれ</h2>
        <p>@ueda_amare</p>
      </div>
    </div>
  );
};

export default SettingProfile;

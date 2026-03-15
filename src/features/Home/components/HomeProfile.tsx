import "./HomeProfile.css";
import IconProfile from "../../../assets/icon_profile.png";
import IconSleepy from "../../../assets/icon_sleepy.png";
import IconWakeup from "../../../assets/icon_wakeup.png";

const HomeProfile = () => {
  return (
    <>
      <div className="home_profile">
        <img src={IconProfile} alt="" />
        <section>
          <h2>あまれってぃー</h2>
          <div>
            <img src={IconSleepy} alt="" />
            <p>起きています</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomeProfile;

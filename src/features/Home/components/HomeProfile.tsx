import "./HomeProfile.css";
import IconProfile from "../../../assets/icon_profile.png";
import IconSleepy from "../../../assets/icon_sleepy.png";

type HomeProfileProps = {
  name: string;
  status: "sleepy" | "wake";
  profileImage: string;
};

const HomeProfile = ({ name, status, profileImage }: HomeProfileProps) => {
  return (
    <div className="home_profile">
      <img
        src={profileImage}
        alt="profile"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = IconProfile;
        }}
        className="homeProfileIcon"
      />

      <section>
        <h2>{name}</h2>

        <div>
          <img src={status === "wake" ? IconWakeup : IconSleepy} alt="status" />
          <p>{status === "wake" ? "起きています" : "寝ています"}</p>
        </div>
      </section>
    </div>
  );
};

export default HomeProfile;

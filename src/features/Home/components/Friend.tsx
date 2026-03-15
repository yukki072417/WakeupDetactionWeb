import ProfileIcon from "../../../assets/icon_profile.png";
import IconSleepy from "../../../assets/icon_sleepy.png";
import IconWakeup from "../../../assets/icon_wakeup.png";

type FriendProps = {
  name: string;
  status: "sleep" | "wakeup" | "sleepOver" | "nightOver";
  sleepTime: string;
  wakeTime: string;
  icon?: string;
};

const statusText = {
  wakeup: "起きています",
  sleep: "寝ています",
  sleepOver: "寝坊しています",
  nightOver: "夜更かし中",
};

const Friend = ({ name, status, sleepTime, wakeTime, icon }: FriendProps) => {
  return (
    <div className={`Friend ${status}`}>
      <img src={icon || ProfileIcon} alt="" className="profileIcon" />

      <div className="flex_friend">
        <h3>{name}</h3>

        <div>
          <img src={status === "wakeup" ? IconWakeup : IconSleepy} alt="" />
          <p>{statusText[status]}</p>
        </div>

        <p>
          {sleepTime}に寝ます {wakeTime}に起きます
        </p>
      </div>
    </div>
  );
};

export default Friend;

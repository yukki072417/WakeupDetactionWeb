import "./Declaration.css";
import IconSleepy from "../../../assets/icon_sleepy_white.png";
import IconWakeup from "../../../assets/icon_wakeup_white.png";

const Declaration = () => {
  return (
    <>
      <div className="Declaration sleepy">
        <img src={IconSleepy} alt="" />
        <input type="time" />
        <p>に寝ます</p>
      </div>
      <div className="Declaration wakeup">
        <img src={IconWakeup} alt="" />
        <input type="time" />
        <p>に起きます</p>
      </div>
    </>
  );
};

export default Declaration;

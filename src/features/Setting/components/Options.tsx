import "./Options.css";
import IconAlarm from "../../../assets/icon_alarm.png";

const Options = () => {
  return (
    <>
      <h2>設定</h2>
      <div className="option_wrap">
        <div className="option_box">
          <img src={IconAlarm} alt="" />
          <div>
            <h3>起床通知</h3>
            <p>起きる時間になったら通知を送信します</p>
          </div>
        </div>
        <label className="toggle">
          <input type="checkbox" />
          <span className="slider"></span>
        </label>
      </div>
    </>
  );
};

export default Options;

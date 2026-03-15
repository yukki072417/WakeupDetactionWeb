import "./Options.css";
import IconAlarm from "../../../assets/icon_alarm.png";
import IconSentiment from "../../../assets/Icon_Sentiment.png";
import IconSleep from "../../../assets/icon_sleep.png";
import IconDarkmode from "../../../assets/icon_darkmode.png";
import IconPrivacy from "../../../assets/icon_privacy.png";
import IconBlock from "../../../assets/icon_block.png";

const options = [
  {
    title: "起床通知",
    description: "起きる時間になったら通知を送信します",
    icon: IconAlarm,
    toggle: true,
  },
  {
    title: "友達の寝坊通知",
    description: "友達が寝坊した時に通知します",
    icon: IconSentiment,
    toggle: true,
  },
  {
    title: "就寝通知",
    description: "寝る時間になったら通知します",
    icon: IconSleep,
    toggle: true,
  },
  {
    title: "ダークモード",
    description: "coming soon",
    icon: IconDarkmode,
    toggle: true,
  },
  {
    title: "プライバシー設定",
    description: "",
    icon: IconPrivacy,
    toggle: false,
  },
  {
    title: "ブロックしたユーザー",
    description: "",
    icon: IconBlock,
    toggle: false,
  },
];

const Options = () => {
  return (
    <>
      <h2>設定</h2>
      {options.map((option, index) => (
        <div className="option_wrap" key={index}>
          <div className="option_box">
            <img src={option.icon} alt="" />

            <div>
              <h3>{option.title}</h3>
              <p>{option.description}</p>
            </div>
          </div>

          {option.toggle && (
            <label className="toggle">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          )}
        </div>
      ))}
    </>
  );
};

export default Options;

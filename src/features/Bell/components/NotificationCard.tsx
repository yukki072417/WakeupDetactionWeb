import "./NotificationCard.css";
import IconProfile from "../../../assets/icon_profile.png";
import IconCheck from "../../../assets/icon_check.png";
import IconCancel from "../../../assets/icon_cancel.png";

type Props = {
  data: {
    id: number;
    type: string;
    user: string;
    message: string;
    time: string;
  };
};

const NotificationCard = ({ data }: Props) => {
  return (
    <div className="bell_card">
      <img src={IconProfile} alt="" />

      <div className="bell_text">
        <p>
          {data.user}
          {data.message}
          <span> {data.time}</span>
        </p>

        {data.type === "friend" && (
          <div className="btns">
            <div className="check">
              <img src={IconCheck} alt="" />
              <p>承認</p>
            </div>

            <div className="cancel">
              <img src={IconCancel} alt="" />
              <p>拒否</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;

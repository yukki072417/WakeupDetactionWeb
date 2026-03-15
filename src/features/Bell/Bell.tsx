import "./Bell.css";
import IconArrow from "../../assets/icon_arrow.png";
import NotificationCard from "./components/NotificationCard";
import { useNavigate } from "react-router-dom";

const notifications = [
  {
    id: 1,
    type: "friend",
    user: "うえだあまね",
    message: "が友達リクエストを送信しました。",
    time: "3時間前",
  },
  {
    id: 2,
    type: "late",
    user: "うえだあまね",
    message: "が寝坊しているよ！",
    time: "3時間前",
  },
  {
    id: 3,
    type: "night",
    user: "うえだあまね",
    message: "が夜更かししているよ！",
    time: "3時間前",
  },
];

const Bell = () => {
  const navigate = useNavigate();
  return (
    <>
      <header>
        <img src={IconArrow} alt="" onClick={() => navigate(-1)} />
        <h1>通知</h1>
        <span></span>
      </header>

      <main>
        {notifications.map((notice) => (
          <NotificationCard key={notice.id} data={notice} />
        ))}
      </main>
    </>
  );
};

export default Bell;

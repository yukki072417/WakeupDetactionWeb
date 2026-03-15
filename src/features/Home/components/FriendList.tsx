import Friend from "./Friend";
import "./FriendList.css";

type FriendStatus = "sleep" | "wakeup" | "sleepOver" | "nightOver";

type FriendType = {
  name: string;
  status: FriendStatus;
  sleepTime: string;
  wakeTime: string;
};

const friends: FriendType[] = [
  {
    name: "あまね",
    status: "wakeup",
    sleepTime: "23:30",
    wakeTime: "8:00",
  },
  {
    name: "しゅん",
    status: "nightOver",
    sleepTime: "1:30",
    wakeTime: "8:00",
  },
  {
    name: "ゆっきー",
    status: "sleepOver",
    sleepTime: "23:00",
    wakeTime: "7:00",
  },
];
const FriendList = () => {
  return (
    <>
      <h2 className="title night">ピン留めされた友達</h2>

      {friends.map((friend, index) => (
        <Friend
          key={index}
          name={friend.name}
          status={friend.status}
          sleepTime={friend.sleepTime}
          wakeTime={friend.wakeTime}
        />
      ))}

      <h2 className="title">友達リスト</h2>
    </>
  );
};

export default FriendList;

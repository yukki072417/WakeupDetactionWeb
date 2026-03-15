import { useState } from "react";
import "./PickupFriend.css";
import ProfileIcon from "../../../assets/icon_profile.png";
import PlusFriend from "../../../assets/icon_plusFriend.png";
import AfterApplication from "../../../assets/AfterApplication.png";

const initialFriends = [
  { id: 1, name: "うえだあまね", idName: "@ueda_amane", added: false },
  { id: 2, name: "しゅん", idName: "@shun_dev", added: false },
  { id: 3, name: "ゆっきー", idName: "@yukky", added: false },
];

const PickupFriend = () => {
  const [friends, setFriends] = useState(initialFriends);

  const toggleAdd = (id: number) => {
    setFriends((prev) =>
      prev.map((friend) =>
        friend.id === id ? { ...friend, added: !friend.added } : friend
      )
    );
  };
  return (
    <>
      <h2>おすすめの友達</h2>

      {friends.map((friend) => (
        <div className="friend_card" key={friend.id}>
          <div className="friend_profile">
            <img src={ProfileIcon} alt="" />

            <div>
              <h3>{friend.name}</h3>
              <p>{friend.idName}</p>
            </div>
          </div>

          <div
            className={`add_btn ${friend.added ? "AfterApplication" : ""}`}
            onClick={() => toggleAdd(friend.id)}
          >
            <img src={friend.added ? AfterApplication : PlusFriend} alt="" />
            <p>{friend.added ? "申請中" : "追加"}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default PickupFriend;

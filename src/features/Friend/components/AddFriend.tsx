import { useState } from "react";
import "./AddFriend.css";
import SearchIcon from "../../../assets/icon_search.png";
import CopyIcon from "../../../assets/icon_copy.png";
import ProfileIcon from "../../../assets/icon_profile.png";
import PlusFriend from "../../../assets/icon_plusFriend.png";
import AfterApplication from "../../../assets/AfterApplication.png";
import CloseBtnImg from "../../../assets/icon_close.png";
import { getProfile } from "../../../common/api/profile";
import { type ProfileResponse } from "../../../common/api/profile";
import { useAuth } from "../../../common/contexts/authContext";

type User = {
  userId: string;
  userName: string;
};

const AddFriend = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchID, setSearchID] = useState(""); // ← 入力されたID
  const [user, setUser] = useState<User | null>(null);
  const [added, setAdded] = useState(false);
  const { session } = useAuth();

  const copyID = async () => {
    await navigator.clipboard.writeText("@sample_user");
    alert("コピーしました！");
  };

  const handleSearch = async (userId: string) => {
    if (!searchID || !session) return;

    try {
      const response: ProfileResponse = await getProfile({
        accessToken: session.accessToken,
        userId: userId,
      });

      if (response.success) {
        setUser({
          userId: response.user_id,
          userName: response.username,
        });
      }
      setShowModal(true);
    } catch (err) {
      console.error(err);
      alert("ユーザーが見つかりませんでした");
    }
  };

  return (
    <>
      <div className="friend_share">
        <h2>友達を追加</h2>
        <p>友達と睡眠を共有しよう</p>
      </div>

      <div className="search_box">
        <label>
          <img src={SearchIcon} alt="" />
          <input
            type="text"
            placeholder="ユーザーIDで検索"
            value={searchID}
            onChange={(e) => setSearchID(e.target.value)}
          />
        </label>

        <div className="search_btn" onClick={() => handleSearch(searchID)}>
          <p>検索</p>
        </div>
      </div>

      <div className="user_copy" onClick={copyID}>
        <h3>マイユーザーIDをコピー</h3>
        <img src={CopyIcon} alt="" />
      </div>

      {showModal && user && (
        <div className="modal_overlay">
          <div className="modal_box">
            <div className="modal_profile">
              <img src={ProfileIcon} alt="" />
              <h2>{user.userName}</h2>
              <p>@{user.userId}</p>
            </div>

            <div className="count_box">
              <div>
                <h3>21</h3>
                <p>友達</p>
              </div>
              <div>
                <h3>4</h3>
                <p>寝坊回数</p>
              </div>
            </div>

            <div
              className={`add_btn ${added ? "AfterApplication" : ""}`}
              onClick={() => setAdded(!added)}
            >
              <img src={added ? AfterApplication : PlusFriend} alt="" />
              <p>{added ? "追加済み" : "追加"}</p>
            </div>
          </div>

          <div className="close_btn" onClick={() => setShowModal(false)}>
            <img src={CloseBtnImg} alt="" />
          </div>
        </div>
      )}
    </>
  );
};

export default AddFriend;

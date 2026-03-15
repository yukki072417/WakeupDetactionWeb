import { useState } from "react";
import "./AddFriend.css";
import SearchIcon from "../../../assets/icon_search.png";
import CopyIcon from "../../../assets/icon_copy.png";
import ProfileIcon from "../../../assets/icon_profile.png";
import PlusFriend from "../../../assets/icon_plusFriend.png";
import AfterApplication from "../../../assets/AfterApplication.png";

const AddFriend = () => {
  const [showModal, setShowModal] = useState(false);
  const [added, setAdded] = useState(false);

  const copyID = async () => {
    await navigator.clipboard.writeText("@sample_user");
    alert("コピーしました！");
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
          <input type="text" placeholder="ユーザーIDで検索" />
        </label>

        <div className="search_btn" onClick={() => setShowModal(true)}>
          <p>検索</p>
        </div>
      </div>

      <div className="user_copy" onClick={copyID}>
        <h3>マイユーザーIDをコピー</h3>
        <img src={CopyIcon} alt="" />
      </div>

      {showModal && (
        <div className="modal_overlay">
          <div className="modal_box">
            <div className="modal_profile">
              <img src={ProfileIcon} alt="" />
              <h2>上田あまね</h2>
              <p>@ueda_amane</p>
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
              <p>{added ? "追加済み" : "追加"}</p>{" "}
            </div>
          </div>
          <div onClick={() => setShowModal(false)}></div>
        </div>
      )}
    </>
  );
};

export default AddFriend;

import { useState } from "react";
import "./ChangeProfile.css";
import IconProfile from "../../../assets/icon_profile.png";
import IconPhoto from "../../../assets/icon_photo.png";

const ChangeProfile = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="profile_edit" onClick={() => setShowModal(true)}>
        <h3>プロフィール編集</h3>
      </div>

      <div className="friend_count">
        <div>
          <h3>12</h3>
          <p>友達</p>
        </div>
        <div>
          <h3>4</h3>
          <p>寝坊回数</p>
        </div>
      </div>

      {showModal && (
        <div className="modal_overlay">
          <picture>
            <img src={IconProfile} alt="" />
            <span></span>
          </picture>
          <div className="nameCard">
            <h3>名前</h3>
            <input type="text" placeholder="うえだあまれ" />
          </div>
          <div className="nameCard">
            <h3>ユーザーID</h3>
            <input type="text" placeholder="@ueda_amare" />
          </div>
          <div className="btn" onClick={() => setShowModal(false)}>
            <h3>プロフィールを保存</h3>
          </div>
          <div className="btn nobtn" onClick={() => setShowModal(false)}>
            <h3>キャンセル</h3>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangeProfile;

import "./ChangeProfile.css";

const ChangeProfile = () => {
  return (
    <>
      <div className="profile_edit">
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
    </>
  );
};

export default ChangeProfile;

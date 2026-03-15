import "./AddFriend.css";
import SearchIcon from "../../../assets/icon_search.png";
import CopyIcon from "../../../assets/icon_copy.png";

const AddFriend = () => {
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
        <div className="search_btn">
          <p>検索</p>
        </div>
      </div>
      <div className="user_copy" onClick={copyID}>
        <h3>マイユーザーIDをコピー</h3>
        <img src={CopyIcon} alt="" />
      </div>
    </>
  );
};

export default AddFriend;

import { useEffect, useState } from "react";
import "./ChangeProfile.css";
import IconProfile from "../../../assets/icon_profile.png";
import { useAuth } from "../../../common/contexts/authContext";
import {
  editProfile,
  getProfile,
  uploadProfileImage,
} from "../../../common/api/profile";

const ChangeProfile = () => {
  const { session } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  // const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSave = async () => {
    if (!session?.accessToken) {
      setError("ログインが必要です");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      if (selectedFile) {
        await uploadProfileImage({
          accessToken: session.accessToken,
          file: selectedFile,
        });
      }

      if (username.trim() || userId.trim()) {
        await editProfile({
          accessToken: session.accessToken,
          username: username.trim() || undefined,
          userId: userId.trim() || undefined,
        });
      }

      setShowModal(false);
      setSelectedFile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "保存に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.accessToken || !session?.userId) return;

      try {
        const profileData = await getProfile({
          accessToken: session.accessToken,
          userId: session.userId,
        });

        if (profileData.success) {
          setUsername(profileData.username || "");
          setUserId(profileData.user_id || "");
          // setProfileImageUrl(profileData.profile_image_url || null);
        }
      } catch (err) {
        console.error("プロフィール取得エラー:", err);
      }
    };

    fetchProfile();
  }, [session?.accessToken, session?.userId]);

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
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="profile-image-input"
            />
            <label htmlFor="profile-image-input" style={{ cursor: "pointer" }}>
              画像を変更
            </label>
          </picture>
          <div className="nameCard">
            <h3>名前</h3>
            <input
              type="text"
              placeholder="うえだあまれ"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="nameCard">
            <h3>ユーザーID</h3>
            <input
              type="text"
              placeholder="@ueda_amare"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          {error && (
            <p style={{ color: "crimson", textAlign: "center" }}>{error}</p>
          )}
          <div className="btn" onClick={handleSave}>
            <h3>{loading ? "保存中..." : "プロフィールを保存"}</h3>
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

import "./Footer.css";
import iconFriend from "../../../assets/icon_addFriend.png";
import iconFriendBlue from "../../../assets/icon_addFriend_blue.png";
import iconHome from "../../../assets/icon_home.png";
import iconHomeBlue from "../../../assets/icon_home_blue.png";
import iconSetting from "../../../assets/icon_setting.png";
import iconSettingBlue from "../../../assets/icon_setting_blue.png";
import { useNavigate } from "react-router-dom";

type FooterProps = {
  active: "home" | "friend" | "setting";
};

const Footer = ({ active }: FooterProps) => {
  const navigate = useNavigate();
  const navItems = [
    {
      key: "home",
      label: "ホーム",
      path: "/",
      icon: iconHome,
      activeIcon: iconHomeBlue,
    },
    {
      key: "friend",
      label: "友達追加",
      path: "/friend",
      icon: iconFriend,
      activeIcon: iconFriendBlue,
    },
    {
      key: "setting",
      label: "設定",
      path: "/setting",
      icon: iconSetting,
      activeIcon: iconSettingBlue,
    },
  ];

  return (
    <footer>
      {navItems.map((item) => {
        const isActive = active === item.key;

        return (
          <div key={item.key} onClick={() => navigate(item.path)}>
            <img
              src={isActive ? item.activeIcon : item.icon}
              alt={item.label}
            />
            <p className={isActive ? "activePage" : ""}>{item.label}</p>
          </div>
        );
      })}
    </footer>
  );
};

export default Footer;

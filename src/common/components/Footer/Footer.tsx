import "./Footer.css";
import iconFriend from "../../../assets/icon_addFriend.png";
import iconFriendBlue from "../../../assets/icon_addFriend_blue.png";
import iconHome from "../../../assets/icon_home.png";
import iconHomeBlue from "../../../assets/icon_home_blue.png";
import iconSetting from "../../../assets/icon_setting.png";
import iconSettingBlue from "../../../assets/icon_setting_blue.png";

type FooterProps = {
  active: "home" | "friends" | "settings";
};

const Footer = ({ active }: FooterProps) => {
  const navItems = [
    {
      key: "home",
      label: "ホーム",
      icon: iconHome,
      activeIcon: iconHomeBlue,
    },
    {
      key: "friends",
      label: "友達追加",
      icon: iconFriend,
      activeIcon: iconFriendBlue,
    },
    {
      key: "settings",
      label: "設定",
      icon: iconSetting,
      activeIcon: iconSettingBlue,
    },
  ];

  return (
    <footer>
      {navItems.map((item) => {
        const isActive = active === item.key;

        return (
          <div key={item.key}>
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

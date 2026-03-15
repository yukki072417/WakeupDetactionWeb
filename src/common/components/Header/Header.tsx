import Logo from "../../../assets/logo.svg";
import Bell from "../../../assets/icon_bell.png";
import { useNavigate } from "react-router-dom";

import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const path = "/bell";
  return (
    <>
      <header>
        <div></div>

        <h1>
          <img src={Logo} alt="" />
        </h1>

        <picture onClick={() => navigate(path)}>
          <img src={Bell} alt="" />
        </picture>
      </header>
    </>
  );
};

export default Header;

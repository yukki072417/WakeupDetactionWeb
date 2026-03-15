import Logo from "../../../assets/logo.svg";
import Bell from "../../../assets/icon_bell.png";
import "./Header.css";

const Header = () => {
  return (
    <>
      <header>
        <div></div>
        <h1>
          <img src={Logo} alt="" />
        </h1>
        <picture>
          <img src={Bell} alt="" />
        </picture>
      </header>
    </>
  );
};

export default Header;

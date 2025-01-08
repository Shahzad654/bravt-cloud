import { Link } from "react-router-dom";
import LogoIcon from "../assets/images/logo.png";

const Logo = ({ href = "/" }) => {
  return (
    <Link to={href} className="logo">
      <img src={LogoIcon} alt="Logo" width={150} />
    </Link>
  );
};

export default Logo;

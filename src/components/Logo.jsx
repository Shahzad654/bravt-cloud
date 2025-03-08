import { Link } from "react-router-dom";
import LogoIcon from "../assets/images/logo.png";

const Logo = ({ href = "/", style, size = 150 }) => {
  return (
    <Link to={href} className="logo" style={style}>
      <img src={LogoIcon} alt="Logo" width={size} />
    </Link>
  );
};

export default Logo;

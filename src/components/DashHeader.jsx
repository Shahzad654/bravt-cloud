import styled from "styled-components";
import Logo from "../assets/images/logo.png";
import { Layout, theme } from "antd";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { GrLanguage } from "react-icons/gr";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { LuUser } from "react-icons/lu";

const { Header } = Layout;

const DashHeader = () => {
  const { user } = useSelector((state) => state.user);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <StyledHeader style={{ background: colorBgContainer }}>
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <NavLinks>
        {/* <Link to="/" className="link">
          <div className="icon-border">
            <MdEmail className="icon" />
          </div>
          Messages
        </Link>
        <Link to="/" className="link">
          <div className="icon-border">
            <IoDocumentTextOutline className="icon" />
          </div>
          Docs
        </Link> */}
        <div className="link">
          <div className="icon-border">
            <GrLanguage className="icon" />
          </div>
          English
        </div>
        <Link to="/payment" className="link">
          <div className="icon-border">
            <RiMoneyDollarCircleLine className="icon" />
          </div>
          {user.credit}
        </Link>

        <Link to="/profile" className="link">
          <div className="icon-border">
            <LuUser className="icon" />
          </div>
          {user.email}
        </Link>
      </NavLinks>
    </StyledHeader>
  );
};

export default DashHeader;

const StyledHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;

  .logo {
    display: flex;
    align-items: center;

    img {
      width: 120px;
      height: auto;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  .link {
    display: flex;
    align-items: center;
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;

    .icon-border {
      width: 32px;
      height: 32px;
      background-color: var(--bg-color);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 8px;
    }

    .icon {
      width: 20px;
      height: 20px;
    }
  }
`;

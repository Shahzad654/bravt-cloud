import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Logo from "../assets/images/logo.png";
import { Layout, theme } from "antd";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { GrLanguage } from "react-icons/gr";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

const { Header } = Layout;

const DashHeader = () => {
  const [credit, setCredit] = useState(0);
  const [email, setEmail] = useState("");

 
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setCredit(parsedData.credit);
      setEmail(parsedData.email);
    }
  }, []);


  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <StyledHeader
      style={{
        background: colorBgContainer,
      }}
    >
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <NavLinks>
        <Link to="/" className="link">
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
        </Link>
        <Link to="/" className="link">
          <div className="icon-border">
            <GrLanguage className="icon" />
          </div>
          English
        </Link>
        <Link to="/" className="link">
          <div className="icon-border">
            <RiMoneyDollarCircleLine className="icon" />
          </div>
          {credit.toFixed(2)}
        </Link>

        <Link to="/" className="link">
          <div className="icon-border">
            <RiMoneyDollarCircleLine className="icon" />
          </div>
          {email}
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

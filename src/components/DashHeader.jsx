import styled from "styled-components";
import Logo from "../assets/images/logo.png";
import { Button, Layout, Popover, Tag, theme } from "antd";
import { Link } from "react-router-dom";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { useGetSessionQuery } from "../redux/apis/auth";
import UserMenu from "./UserMenu";
import { formatPrice } from "../utils/helpers";

const { Header } = Layout;

const DashHeader = () => {
  const { data } = useGetSessionQuery();

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

        <Popover
          content={
            <div style={{ width: "250px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "20px",
                }}
              >
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  Balance
                </p>

                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  {formatPrice(data.credits)}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "20px",
                }}
              >
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  Status
                </p>

                <Tag color={data.isSubscribed ? "green" : "blue"}>
                  {data.isSubscribed ? "Subscribed" : "Normal"}
                </Tag>
              </div>

              <Link to="/payment">
                <Button type="primary" style={{ width: "100%" }}>
                  Recharge
                </Button>
              </Link>
            </div>
          }
        >
          <div className="link">
            <div className="icon-border">
              <RiMoneyDollarCircleLine className="icon" />
            </div>
            {Number(data.credits).toFixed(2)}
          </div>
        </Popover>

        <UserMenu />
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
    cursor: pointer;

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

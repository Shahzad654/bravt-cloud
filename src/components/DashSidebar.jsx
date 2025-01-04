import styled from "styled-components";
import { Menu, Layout } from "antd";
import {
  AppstoreAddOutlined,
  QuestionCircleOutlined,
  ProductOutlined,
  MoneyCollectOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, logoutUser } from "../redux/apis/userSlice";

const { Sider } = Layout;

function getItem(label, key, icon, children, path) {
  return {
    key,
    icon,
    children,
    label: path ? (
      <Link to={path} style={{ textDecoration: "none" }}>
        {label}
      </Link>
    ) : (
      label
    ),
  };
}

const items = [
  getItem("Products", "sub1", <ProductOutlined />, [
    getItem("Instance", "3", null, null, "/instance"),
    getItem("Network", "4", null, null, "/network"),
    getItem("Block Storage", "5", null, null, "/storage"),
    getItem("Snapshot", "6", null, null, "/snapshot"),
    getItem("Firewall", "7", null, null, "/firewall"),
    getItem("Images", "8", null, null, "/images"),
    getItem("Monitoring", "9", null, null, "/monitoring"),
  ]),
  getItem("Financial", "sub2", <MoneyCollectOutlined />, [
    getItem("Payment", "10", null, null, "/payment"),
    getItem("Resource Record", "11", null, null, "/resource-record"),
    getItem("Billing", "12", null, null, "/billing"),
  ]),
  getItem("Support", "sub3", <QuestionCircleOutlined />, [
    getItem("Ticket", "13", null, null, "/ticket"),
  ]),
  getItem("Affiliate", "sub4", <AppstoreAddOutlined />, [
    getItem("Link code", "14", null, null, "/link-code"),
    // getItem("Affiliate Stats", "15", null, null, "/stats"),
  ]),
  getItem("Account", "sub5", <ProfileOutlined />, [
    getItem("Profile", "16", null, null, "/profile"),
    getItem("Authentication", "17", null, null, "/authentication"),
  ]),
];

const DashSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logoutUser();
    dispatch(setUser(null));
    navigate("/");
  };

  return (
    <StyledSider>
      <Sider>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          style={{ backgroundColor: "#123456" }}
        />
        <button
          className="small-btn"
          style={{
            marginLeft: "40px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </Sider>
    </StyledSider>
  );
};

export default DashSidebar;

const StyledSider = styled(Sider)`
  background-color: #123456;
  @media (max-width: 600px) {
    height: 250vh;
  }
`;

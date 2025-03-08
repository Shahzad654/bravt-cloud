import { Dropdown, Flex } from "antd";
import { LuUser, LuLogOut, LuLock } from "react-icons/lu";
import { useGetSessionQuery, useLogoutMutation } from "../redux/apis/auth";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const { data: user } = useGetSessionQuery();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  return (
    <Dropdown
      menu={{
        items: [
          {
            icon: <LuUser size={18} />,
            label: "Profile",
            onClick: () => navigate("/profile"),
          },
          {
            icon: <LuLock size={18} />,
            label: "Change Password",
            onClick: () => navigate("/change-password"),
          },
          {
            icon: <LuLogOut size={18} />,
            label: "Logout",
            danger: true,
            onClick: async () => logout(),
          },
        ],
      }}
    >
      <Flex
        align="center"
        gap={4}
        style={{ cursor: "pointer", color: "var(--primary-color)" }}
        className="link"
      >
        <div className="icon-border">
          <LuUser className="icon" size={18} />
        </div>
        {user.email}
      </Flex>
    </Dropdown>
  );
};

export default UserMenu;

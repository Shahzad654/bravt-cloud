import React, { useMemo } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Button,
} from "@mui/material";

import {
  TbActivity,
  TbLayoutDashboard,
  TbServer,
  TbUsers,
  TbCurrencyDollar,
  TbHelpCircle,
  TbChevronUp,
  TbChevronDown,
  TbSettings,
  TbTags,
} from "react-icons/tb";

import Logo from "../components/Logo";
import { useLogoutMutation } from "../redux/apis/auth";

const DRAWER_WIDTH = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  zIndex: 10,
  "& .MuiDrawer-paper": {
    width: DRAWER_WIDTH,
    backgroundColor: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down("sm")]: {
      minHeight: "250vh",
    },
  },
}));

const menuItems = [
  {
    label: "Dashboard",
    icon: <TbLayoutDashboard size={20} />,
    path: "/dashboard",
  },
  {
    label: "Plans",
    icon: <TbTags size={20} />,
    path: "/plans",
  },
  {
    label: "VPS Management",
    icon: <TbServer size={20} />,
    children: [
      { label: "Instances", path: "/vps/instances" },
      { label: "Snapshots", path: "/vps/snapshots" },
      { label: "Firewalls", path: "/vps/firewalls" },
      { label: "SSH Keys", path: "/vps/ssh" },
    ],
  },
  {
    label: "Customers",
    icon: <TbUsers size={20} />,
    path: "/customer",
  },
  {
    label: "Transactions",
    icon: <TbCurrencyDollar size={20} />,
    path: "/order-management",
  },
  {
    label: "Activity Logs",
    icon: <TbActivity size={20} />,
    path: "/activity-logs",
  },
  {
    label: "Support",
    icon: <TbHelpCircle size={20} />,
    path: "/support",
  },
  {
    label: "Settings",
    icon: <TbSettings size={20} />,
    path: "/settings",
  },
];

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [logoutUser] = useLogoutMutation();

  const defaultOpenMenus = useMemo(() => {
    const currentPath = location.pathname;
    const initialOpenMenus = {};
    menuItems.forEach((item) => {
      if (item.children) {
        const hasMatchingChild = item.children.some((child) =>
          currentPath.startsWith(child.path)
        );
        if (hasMatchingChild) {
          initialOpenMenus[item.label] = true;
        }
      }
    });

    return initialOpenMenus;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [openMenus, setOpenMenus] = React.useState(defaultOpenMenus || {});

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  const handleMenuClick = (label) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleItemClick = (path) => {
    navigate(path);
  };

  const isPathActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const renderMenuItem = (item) => (
    <React.Fragment key={item.label}>
      <ListItemButton
        selected={isPathActive(item.path)}
        onClick={() =>
          item.children
            ? handleMenuClick(item.label)
            : handleItemClick(item.path)
        }
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: openMenus[item.label]
            ? "rgba(0, 0, 0, 0.02)"
            : "transparent",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
          "& .MuiListItemIcon-root": {
            minWidth: 20,
            marginRight: 2,
          },
          "& .MuiTypography-root": {
            fontSize: "14px",
          },
        }}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.label} />
        {item.children &&
          (openMenus[item.label] ? (
            <TbChevronUp size={16} />
          ) : (
            <TbChevronDown size={16} />
          ))}
      </ListItemButton>
      {item.children && (
        <Collapse in={openMenus[item.label]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child) => (
              <ListItemButton
                key={child.label}
                sx={{
                  pl: 9,
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                  },
                }}
                onClick={() => handleItemClick(child.path)}
                selected={isPathActive(child.path)}
              >
                <ListItemText
                  primary={child.label}
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "14px",
                      fontWeight: isPathActive(child.path) ? 500 : 400,
                      marginLeft: "-18px",
                    },
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </React.Fragment>
  );

  return (
    <StyledDrawer variant="permanent" anchor="left">
      <div style={{ padding: "16px" }}>
        <Logo href="/dashboard" />
      </div>
      <List>{menuItems.map(renderMenuItem)}</List>
      <Button
        variant="outlined"
        onClick={handleLogout}
        sx={{
          margin: "auto 16px 10px 16px",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        }}
      >
        Logout
      </Button>
    </StyledDrawer>
  );
};

export default AdminSidebar;

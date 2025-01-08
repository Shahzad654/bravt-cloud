import React, { useMemo } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
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
  FiBox as ProductIcon,
  FiHelpCircle as QuestionIcon,
  FiGrid as AppstoreIcon,
  FiDollarSign as MoneyIcon,
  FiUser as ProfileIcon,
  FiChevronDown as ExpandMoreIcon,
  FiChevronUp as ExpandLessIcon,
} from "react-icons/fi";

import Logo from "../components/Logo";
import { setUser, logoutUser } from "../redux/apis/userSlice";

const DRAWER_WIDTH = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
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
    label: "Products",
    icon: <ProductIcon size={20} />,
    children: [
      { label: "Instance", path: "/instance" },
      { label: "Network", path: "/network" },
      { label: "Block Storage", path: "/storage" },
      { label: "Snapshot", path: "/snapshot" },
      { label: "Firewall", path: "/firewall" },
      { label: "Images", path: "/images" },
      { label: "Monitoring", path: "/monitoring" },
    ],
  },
  {
    label: "Financial",
    icon: <MoneyIcon size={20} />,
    children: [
      { label: "Payment", path: "/payment" },
      { label: "Resource Record", path: "/resource-record" },
      { label: "Billing", path: "/billing" },
    ],
  },
  {
    label: "Support",
    icon: <QuestionIcon size={20} />,
    children: [{ label: "Ticket", path: "/ticket" }],
  },
  {
    label: "Affiliate",
    icon: <AppstoreIcon size={20} />,
    children: [{ label: "Link code", path: "/link-code" }],
  },
  {
    label: "Account",
    icon: <ProfileIcon size={20} />,
    children: [
      { label: "Profile", path: "/profile" },
      { label: "Authentication", path: "/authentication" },
    ],
  },
];

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const defaultOpenMenus = useMemo(() => {
    const currentPath = location.pathname;
    const initialOpenMenus = {};
    menuItems.forEach((item) => {
      const hasMatchingChild = item.children.some((child) =>
        currentPath.startsWith(child.path)
      );
      if (hasMatchingChild) {
        initialOpenMenus[item.label] = true;
      }
    });

    return initialOpenMenus;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [openMenus, setOpenMenus] = React.useState(defaultOpenMenus || {});

  const handleLogout = async () => {
    await logoutUser();
    dispatch(setUser(null));
    navigate("/");
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
        onClick={() => handleMenuClick(item.label)}
        sx={{
          bgcolor: openMenus[item.label]
            ? "rgba(0, 0, 0, 0.02)"
            : "transparent",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        }}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.label} />
        {openMenus[item.label] ? (
          <ExpandLessIcon size={16} />
        ) : (
          <ExpandMoreIcon size={16} />
        )}
      </ListItemButton>
      <Collapse in={openMenus[item.label]} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.children.map((child) => (
            <ListItemButton
              key={child.label}
              sx={{
                pl: 4,
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
                    fontSize: "0.9rem",
                    fontWeight: isPathActive(child.path) ? 500 : 400,
                  },
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );

  return (
    <StyledDrawer variant="permanent" anchor="left">
      <div style={{ padding: "16px" }}>
        <Logo href="/instance" />
      </div>
      <List>{menuItems.map(renderMenuItem)}</List>
      <Button
        variant="outlined"
        onClick={handleLogout}
        sx={{
          margin: "10px 16px",
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

export default DashboardSidebar;

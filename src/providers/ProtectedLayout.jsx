import { Outlet, Navigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import DashboardSidebar from "../components/DashboardSidebar";
import PageSpinner from "../components/PageSpinner";

const ProtectedLayout = () => {
  const location = useLocation();
  const { user, status } = useSelector((state) => state.user);

  if (status === "loading") {
    return <PageSpinner />;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <DashboardSidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          backgroundColor: "white",
          overflow: "auto",
          "& > *:first-of-type": {
            mt: 2,
          },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default ProtectedLayout;

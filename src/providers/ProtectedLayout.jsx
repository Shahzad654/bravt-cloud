import { Outlet, Navigate, useLocation } from "react-router-dom";
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
    <div style={{ display: "flex" }}>
      <DashboardSidebar />
      <div style={{ position: "relative", width: "100%", flex: "1 1 0%" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedLayout;

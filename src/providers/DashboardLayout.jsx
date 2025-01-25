import { Outlet, Navigate } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import PageSpinner from "../components/PageSpinner";
import { useGetSessionQuery } from "../redux/apis/auth";
import ErrorBoundary from "../components/ErrorBoundary";

const ProtectedLayout = () => {
  const { data, isLoading } = useGetSessionQuery();

  if (isLoading) {
    return <PageSpinner />;
  }

  if (!data) {
    return <Navigate to="/login" replace />;
  }

  if (data.initial) {
    return <Navigate to="/setup-password" replace />;
  }

  return (
    <div style={{ display: "flex" }}>
      <DashboardSidebar />
      <div style={{ position: "relative", width: "100%", flex: "1 1 0%" }}>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default ProtectedLayout;

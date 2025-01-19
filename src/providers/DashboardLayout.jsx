import { Outlet, Navigate } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import PageSpinner from "../components/PageSpinner";
import { Suspense } from "react";
import { useGetSessionQuery } from "../redux/apis/auth";

const ProtectedLayout = () => {
  const { data, isLoading } = useGetSessionQuery();

  if (isLoading) {
    return <PageSpinner />;
  }

  if (!data) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ display: "flex" }}>
      <DashboardSidebar />
      <div style={{ position: "relative", width: "100%", flex: "1 1 0%" }}>
        <Suspense fallback={<PageSpinner />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default ProtectedLayout;

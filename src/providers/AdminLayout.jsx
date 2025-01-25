import { Outlet, Navigate } from "react-router-dom";
import AdminSidebar from "../admin/AdminSidebar";
import PageSpinner from "../components/PageSpinner";
import { useGetSessionQuery } from "../redux/apis/auth";

const AdminLayout = () => {
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

  if (data.role !== "ADMIN") {
    return <Navigate to="/instance" replace />;
  }

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <div
        className="tailwind-layout"
        style={{
          position: "relative",
          width: "100%",
          flex: "1 1 0%",
          padding: "24px",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;

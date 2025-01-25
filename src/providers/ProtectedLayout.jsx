import { Navigate, Outlet } from "react-router-dom";
import PageSpinner from "../components/PageSpinner";
import { useGetSessionQuery } from "../redux/apis/auth";

const ProtectedLayout = () => {
  const { data, isLoading } = useGetSessionQuery();

  if (isLoading) {
    return <PageSpinner />;
  }

  if (data) {
    if (data.initial === true) {
      return <Navigate to="/setup-password" replace />;
    } else {
      <Outlet />;
    }
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedLayout;

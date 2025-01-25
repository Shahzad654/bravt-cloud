import { Navigate, Outlet, useLocation } from "react-router-dom";
import PageSpinner from "../components/PageSpinner";
import { useGetSessionQuery } from "../redux/apis/auth";

const ProtectedLayout = () => {
  const { pathname } = useLocation();
  const { data, isLoading } = useGetSessionQuery();

  if (isLoading) {
    return <PageSpinner />;
  }

  if (data) {
    if (data.initial === true && pathname !== "/setup-password") {
      return <Navigate to="/setup-password" replace />;
    } else {
      return <Outlet />;
    }
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedLayout;

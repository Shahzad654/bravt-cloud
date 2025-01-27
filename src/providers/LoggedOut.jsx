import { Navigate, Outlet } from "react-router-dom";
import PageSpinner from "../components/PageSpinner";
import { useGetSessionQuery } from "../redux/apis/auth";

const LoggedOut = () => {
  const { data, isLoading } = useGetSessionQuery();

  if (isLoading) {
    return <PageSpinner />;
  }

  if (data) {
    return (
      <Navigate
        replace
        to={
          data.initial === true
            ? "/setup-password"
            : data.role === "ADMIN"
              ? "/dashboard"
              : "/instance"
        }
      />
    );
  }

  return <Outlet />;
};

export default LoggedOut;

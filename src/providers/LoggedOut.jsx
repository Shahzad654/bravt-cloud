import { Navigate, Outlet } from "react-router-dom";
import PageSpinner from "../components/PageSpinner";
import { useGetSessionQuery } from "../redux/apis/auth";

const LoggedOut = () => {
  const { data, isLoading } = useGetSessionQuery();

  if (isLoading) {
    return <PageSpinner />;
  }

  return data ? (
    <Navigate
      to={
        data.initial === true
          ? "/setup-password"
          : data.role === "ADMIN"
            ? "/dashboard"
            : "/instance"
      }
      replace
    />
  ) : (
    <Outlet />
  );
};

export default LoggedOut;

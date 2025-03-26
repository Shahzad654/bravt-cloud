import { Navigate, Outlet } from "react-router-dom";
import PageSpinner from "../components/PageSpinner";
import { useGetSessionQuery } from "../redux/apis/auth";

const LoggedOut = () => {
  const { data, isLoading } = useGetSessionQuery();

  if (isLoading) {
    return <PageSpinner />;
  }

  if (data) {
    if (data.role === "ADMIN") {
      window.location.href = process.env.REACT_APP_ADMIN_URL;
    }

    return (
      <Navigate
        replace
        to={data.initial === true ? "/setup-password" : "/instance"}
      />
    );
  }

  return <Outlet />;
};

export default LoggedOut;

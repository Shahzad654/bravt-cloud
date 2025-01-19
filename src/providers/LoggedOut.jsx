import { Navigate, Outlet } from "react-router-dom";
import PageSpinner from "../components/PageSpinner";
import { Suspense } from "react";
import { useGetSessionQuery } from "../redux/apis/auth";

const LoggedOut = () => {
  const { data, isLoading } = useGetSessionQuery();

  if (isLoading) {
    return <PageSpinner />;
  }

  return data ? (
    <Navigate to="/instance" replace />
  ) : (
    <Suspense fallback={<PageSpinner />}>
      <Outlet />
    </Suspense>
  );
};

export default LoggedOut;

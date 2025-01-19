import { Navigate, Outlet } from "react-router-dom";
import PageSpinner from "../components/PageSpinner";
import { Suspense } from "react";
import { useGetSessionQuery } from "../redux/apis/auth";

const ProtectedLayout = () => {
  const { data, isLoading } = useGetSessionQuery();

  if (isLoading) {
    return <PageSpinner />;
  }

  return data ? (
    <Suspense fallback={<PageSpinner />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedLayout;

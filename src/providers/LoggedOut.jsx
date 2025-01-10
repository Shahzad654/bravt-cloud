import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import PageSpinner from "../components/PageSpinner";
import { Suspense } from "react";

const LoggedOut = () => {
  const { user, status } = useSelector((state) => state.user);

  if (status === "loading") {
    return <PageSpinner />;
  }

  return user ? (
    <Navigate to="/instance" replace />
  ) : (
    <Suspense fallback={<PageSpinner />}>
      <Outlet />
    </Suspense>
  );
};

export default LoggedOut;

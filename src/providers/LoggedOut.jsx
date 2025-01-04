import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PageSpinner from "../components/PageSpinner";

const LoggedOut = ({ children }) => {
  const { user, status } = useSelector((state) => state.user);

  if (status === "loading") {
    return <PageSpinner />;
  }

  return user ? <Navigate to="/instance" /> : children;
};

export default LoggedOut;

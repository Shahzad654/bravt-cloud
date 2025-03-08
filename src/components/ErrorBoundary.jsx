import { useSelector } from "react-redux";
import ErrorFallback from "./ErrorFallback";

const ErrorBoundary = ({ children }) => {
  const { error } = useSelector((state) => state.apiError);

  if (!error) {
    return children;
  }

  return <ErrorFallback error={error} />;
};

export default ErrorBoundary;

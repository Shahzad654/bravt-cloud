import { Button, Flex, Result } from "antd";
import { useLocation } from "react-router-dom";
import { useGetSessionQuery } from "../redux/apis/auth";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const { pathname } = useLocation();
  const { data: user } = useGetSessionQuery();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Result
        status={error?.status || "500"}
        title={error?.status || "500"}
        subTitle={error?.message || "Something went wrong, try again later"}
        extra={
          <Flex align="center" justify="center" gap={4}>
            <Button
              type="primary"
              onClick={() => {
                if (resetErrorBoundary) {
                  resetErrorBoundary();
                } else {
                  window.location.href = pathname;
                }
              }}
            >
              Try again
            </Button>
            <Button
              onClick={() =>
                (window.location.href = user ? "/instance" : "/login")
              }
            >
              Back Home
            </Button>
          </Flex>
        }
      />
    </div>
  );
};

export default ErrorFallback;

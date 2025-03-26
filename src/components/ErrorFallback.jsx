import { Button, Flex, Result } from "antd";
import { useGetSessionQuery } from "../redux/apis/auth";

const ErrorFallback = ({ apiError }) => {
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
        status={apiError?.status || "500"}
        title={apiError?.status || "500"}
        subTitle={apiError?.message || "Something went wrong, try again later"}
        extra={
          <Flex align="center" justify="center" gap={4}>
            <Button type="primary" onClick={() => window.location.reload()}>
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

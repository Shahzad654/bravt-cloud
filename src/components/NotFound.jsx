import { Button, Result } from "antd";
import { useGetSessionQuery } from "../redux/apis/auth";
import { Link } from "react-router-dom";

const NotFound = ({ href = "/instance" }) => {
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
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to={user ? href : "/login"}>
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    </div>
  );
};

export default NotFound;

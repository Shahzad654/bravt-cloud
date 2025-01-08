import { Button, Result } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NotFound = () => {
  const { user } = useSelector((state) => state.user);

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
          <Link to={user ? "/instance" : "/"}>
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    </div>
  );
};

export default NotFound;

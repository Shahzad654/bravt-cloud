import { Spin } from "antd";

const PageSpinner = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin size="default" spinning />
    </div>
  );
};

export default PageSpinner;

import { Spin } from "antd";

const PageSpinner = ({ style }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <Spin size="default" spinning />
    </div>
  );
};

export default PageSpinner;

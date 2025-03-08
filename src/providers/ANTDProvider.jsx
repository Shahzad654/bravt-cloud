import { App, ConfigProvider } from "antd";

const ANTDProvider = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            rowSelectedBg: "#dbeafe",
            rowSelectedHoverBg: "#dbeafe",
          },
        },
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
};

export default ANTDProvider;

import { App, ConfigProvider } from "antd";

const ANTDProvider = ({ children }) => {
  return (
    <ConfigProvider>
      <App>{children}</App>
    </ConfigProvider>
  );
};

export default ANTDProvider;

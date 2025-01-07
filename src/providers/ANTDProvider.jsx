import { App, ConfigProvider } from "antd";

const ANTDProvider = ({ children }) => {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "var(--primary-color)" } }}>
      <App>{children}</App>
    </ConfigProvider>
  );
};

export default ANTDProvider;

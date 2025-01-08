import { Tabs } from "antd";

const InstanceTabs = () => {
  return (
    <Tabs
      defaultActiveKey="1"
      items={[
        {
          key: "1",
          label: "Overview",
        },
        {
          key: "2",
          label: "Settings",
        },
        {
          key: "3",
          label: "Snapshots",
        },
        {
          key: "4",
          label: "Tags",
        },
      ]}
    />
  );
};

export default InstanceTabs;

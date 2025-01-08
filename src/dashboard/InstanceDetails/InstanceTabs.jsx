import { Tabs } from "antd";
import InstanceOverview from "./InstanceOverview";

const InstanceTabs = () => {
  return (
    <Tabs
      defaultActiveKey="1"
      items={[
        {
          key: "1",
          label: "Overview",
          children: <InstanceOverview />,
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

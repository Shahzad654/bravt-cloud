import { Tabs } from "antd";
import InstanceOverview from "./InstanceOverview";
import InstanceSettings from "./InstanceSettings";
import CreateInstanceSnapShot from "./CreateInstanceSnapShot";

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
          children: <InstanceSettings />,
        },
        {
          key: "3",
          label: "Snapshots",
          children: <CreateInstanceSnapShot />,
        },
      ]}
    />
  );
};

export default InstanceTabs;

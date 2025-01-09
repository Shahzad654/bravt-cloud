import { Tabs } from "antd";
import GeneralInfoForm from "./GeneralInfoForm";
import ChangeOS from "./ChangeOS";
import ChangePlan from "./ChangePlan";
import InstanceFirewall from "./InstanceFirewall";

const InstanceSettings = () => {
  return (
    <Tabs
      tabPosition="left"
      className="mt-8"
      items={[
        {
          key: "1",
          label: "General",
          children: <GeneralInfoForm />,
        },
        {
          key: "2",
          label: "Firewall",
          children: <InstanceFirewall />,
        },
        {
          key: "3",
          label: "Change OS",
          children: <ChangeOS />,
        },
        {
          key: "4",
          label: "Change Plan",
          children: <ChangePlan />,
        },
      ]}
    />
  );
};

export default InstanceSettings;

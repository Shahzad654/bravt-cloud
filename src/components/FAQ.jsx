import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, theme } from "antd";
const text1 = `
  Newly registered users can get up to $15 as a bonus for the first recharge. They only need to complete three steps: register, fill in basic information, and recharge the platform, and then they can activate the host that needs to be configured as needed.
PS: As long as the account balance is sufficient, you can always use the machine, no need to renew.
`;

const text2 = `
  The first charge bonus is a benefit given to users by LightNode. Users can get a bonus of up to $20 (permanent) for resource consumption.
`;

const text3 = `
  No single selection is required. LightNode has equipped with the 50G system disk for each VPS host.
`;
const getItems = (panelStyle) => [
  {
    key: "1",
    label: "How does LightNode turn on the machine?",
    children: <p>{text1}</p>,
    style: panelStyle,
  },
  {
    key: "2",
    label: "What is the first charge of LightNode?",
    children: <p>{text2}</p>,
    style: panelStyle,
  },
  {
    key: "3",
    label: "Does the LightNode system disk need to be selected separately?",
    children: <p>{text3}</p>,
    style: panelStyle,
  },
];
const FAQ = () => {
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };
  return (
    <Collapse
      bordered={false}
      defaultActiveKey={["1"]}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      style={{
        background: token.colorBgContainer,
      }}
      items={getItems(panelStyle)}
    />
  );
};
export default FAQ;

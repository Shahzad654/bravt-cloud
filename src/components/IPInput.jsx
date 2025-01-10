import { Form, Input } from "antd";
import { Address4, Address6 } from "ip-address";

const IpAddressInput = ({ ipType }) => {
  const validateIpAddress = (rule, value, callback) => {
    if (!value) {
      callback("Please input the IP address!");
      return;
    }

    let isValid = false;
    if (ipType === "v4") {
      isValid = Address4.isValid(value);
    } else if (ipType === "v6") {
      isValid = Address6.isValid(value);
    }

    if (!isValid) {
      callback(
        `Please input a valid IPv${ipType === "v4" ? "4" : "6"} address!`
      );
    } else {
      callback();
    }
  };

  return (
    <Form.Item
      label={`IPv${ipType === "v4" ? "4" : "6"} Address`}
      name="subnet"
      rules={[{ validator: validateIpAddress }]}
    >
      <Input />
    </Form.Item>
  );
};

export default IpAddressInput;

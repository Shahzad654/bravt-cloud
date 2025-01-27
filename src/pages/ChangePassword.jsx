import { Button, Form, Input, message } from "antd";
import { useChangePasswordMutation } from "../redux/apis/auth";
import DashHeader from "../components/DashHeader";

const ChangePassword = () => {
  const [form] = Form.useForm();

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const onFinish = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("Passwords don't match");
      return;
    }

    const { error } = await changePassword(values);
    if (error) {
      message.error(error.data.message);
      return;
    }

    message.success("Password changed successfully!");
    form.resetFields();
  };

  return (
    <>
      <DashHeader />
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          padding: "32px",
        }}
      >
        <h3 style={{ marginBottom: "20px" }}>Change Password</h3>
        <Form
          form={form}
          disabled={isLoading}
          onFinish={onFinish}
          layout="vertical"
          preserve={false}
          clearOnDestroy
        >
          <Form.Item
            name="oldPassword"
            label="Current Password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ width: "100%" }}
            >
              Change
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default ChangePassword;

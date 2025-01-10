import { Button, Form, Input, message, Modal } from "antd";
import { useState } from "react";
import { TbPlus } from "react-icons/tb";
import { useCreateFirewallGroupMutation } from "../redux/apis/apiSlice";

const CreateFirewallModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [form] = Form.useForm();

  const [createFirewallGroup, { isLoading }] = useCreateFirewallGroupMutation();

  const onFinish = async (values) => {
    const { error } = await createFirewallGroup(values);
    if (error) {
      message.error(error.message || "Failed to create firewall group!");
    } else {
      setIsOpen(false);
      message.success("Firewall group created!");
    }
  };

  return (
    <>
      <Button
        type="primary"
        icon={<TbPlus size={18} />}
        onClick={() => setIsOpen(true)}
      >
        Add Firewall
      </Button>

      <Modal
        centered
        title="Create a firewall group"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
        destroyOnClose
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: isLoading,
        }}
        modalRender={(dom) => (
          <Form
            form={form}
            disabled={isLoading}
            onFinish={onFinish}
            layout="vertical"
            preserve={false}
            clearOnDestroy
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input autoFocus />
        </Form.Item>
      </Modal>
    </>
  );
};

export default CreateFirewallModal;

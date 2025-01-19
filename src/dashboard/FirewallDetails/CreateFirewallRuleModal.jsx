import { Form, Input, InputNumber, message, Modal, Select } from "antd";
import { useState } from "react";
import { useCreateFirewallRuleMutation } from "../../redux/apis/firewalls";
import { useParams } from "react-router-dom";
import { TbPlus } from "react-icons/tb";
import IPInput from "../../components/IPInput";

const CreateFirewallRuleModal = ({ ip_type = "v4" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [form] = Form.useForm();

  const { firewallId } = useParams();

  const [createFirewallRule, { isLoading }] = useCreateFirewallRuleMutation();

  const onFinish = async (values) => {
    const { error } = await createFirewallRule({
      id: firewallId,
      ip_type,
      ...values,
    });

    if (error) {
      message.error(error.data.message || "Failed to create firewall rule!");
    } else {
      setIsOpen(false);
      message.success("Firewall rule created!");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-md hover:!bg-blue-500 transition-colors"
      >
        <TbPlus size={18} />
        Add Firewall Rule
      </button>

      <Modal
        centered
        title="Create a firewall rule"
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
          name="protocol"
          label="Protocol"
          rules={[{ required: true }]}
        >
          <Select
            options={["ICMP", "TCP", "UDP", "GRE", "ESP", "AH"].map((v) => ({
              label: v,
              value: v,
            }))}
          />
        </Form.Item>

        <Form.Item name="port" label="Port" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <IPInput ipType={ip_type} />

        <Form.Item
          name="subnet_size"
          label="Subnet Size"
          rules={[{ required: true }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="notes" label="Notes">
          <Input.TextArea />
        </Form.Item>
      </Modal>
    </>
  );
};

export default CreateFirewallRuleModal;

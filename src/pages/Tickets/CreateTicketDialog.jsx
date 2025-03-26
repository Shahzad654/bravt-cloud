import { useState } from "react";
import { Modal, Form, Input, Select, message } from "antd";
import { useCreateTicketMutation } from "../../redux/apis/tickets";
import { useNavigate } from "react-router-dom";

const predefinedTopics = [
  "Server Deployment Issues",
  "Billing Questions",
  "Technical Support",
  "Account Management",
  "Service Upgrades",
  "Other",
];

export default function CreateTicketDialog({ isModalOpen, setIsModalOpen }) {
  const [form] = Form.useForm();
  const [selectedTopic, setSelectedTopic] = useState(null);

  const [createTicket, { isLoading }] = useCreateTicketMutation();
  const navigate = useNavigate();

  const handleCreateTicket = async (values) => {
    const { error, data } = await createTicket({
      ...values,
      topic: values.customTopic ?? values.topic,
    });

    if (error) {
      message.error(error.data.message);
      return;
    }

    navigate(`/tickets/${data.id}`);
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleTopicChange = (value) => {
    setSelectedTopic(value);
    if (value !== "Other") {
      form.setFieldValue("customTopic", "");
    }
  };

  return (
    <Modal
      title="Create New Support Ticket"
      open={isModalOpen}
      destroyOnClose
      onOk={() => form.submit()}
      okButtonProps={{
        loading: isLoading,
      }}
      onCancel={() => {
        setIsModalOpen(false);
        form.resetFields();
      }}
    >
      <Form
        disabled={isLoading}
        form={form}
        layout="vertical"
        onFinish={handleCreateTicket}
      >
        <Form.Item
          name="topic"
          label="Topic"
          rules={[{ required: true, message: "Please select a topic" }]}
        >
          <Select onChange={handleTopicChange} placeholder="Select a topic">
            {predefinedTopics.map((topic) => (
              <Select.Option key={topic} value={topic}>
                {topic}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {selectedTopic === "Other" && (
          <Form.Item
            name="customTopic"
            label="Custom Topic"
            rules={[{ required: true, message: "Please enter your topic" }]}
          >
            <Input placeholder="Enter your topic" />
          </Form.Item>
        )}

        <Form.Item
          name="message"
          label="Message"
          rules={[{ required: true, message: "Please enter your message" }]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Describe your issue or question"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

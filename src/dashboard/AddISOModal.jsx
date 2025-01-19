import { Button, Form, Input, message, Modal } from "antd";
import { useState } from "react";
import { TbPlus } from "react-icons/tb";
import { useCreateISOMutation } from "../redux/apis/iso";

const CreateISOModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();

  const [createISO, { isLoading }] = useCreateISOMutation();

  const onFinish = async (values) => {
    const { error } = await createISO(values);

    if (error) {
      message.error(error.data.message || "Failed to create iso!");
    } else {
      setIsOpen(false);
      message.success("ISO created!");
    }
  };

  return (
    <>
      <Button
        type="primary"
        icon={<TbPlus size={18} />}
        onClick={() => setIsOpen(true)}
      >
        Add ISO
      </Button>

      <Modal
        centered
        title="Create Custom ISO"
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
        <Form.Item name="url" label="URL" rules={[{ required: true }]}>
          <Input autoFocus />
        </Form.Item>
      </Modal>
    </>
  );
};

export default CreateISOModal;

import { Button, Form, Input, message, Select } from "antd";
import { useParams } from "react-router-dom";
import {
  useGetInstanceByIdQuery,
  useUpdateInstanceMutation,
} from "../../redux/apis/apiSlice";

const GeneralInfoForm = () => {
  const [form] = Form.useForm();

  const { instanceId } = useParams();
  const { data } = useGetInstanceByIdQuery(instanceId);

  const [updateInstance, { isLoading }] = useUpdateInstanceMutation();

  const onFinish = async (values) => {
    const { error } = await updateInstance({ id: instanceId, ...values });
    if (error) {
      message.error(error.message || "Failed to update instance!");
    } else {
      message.success("Instance updated successfully!");
    }
  };

  return (
    <div className="space-y-4 max-w-[600px] w-full">
      <h1 className="text-2xl font-semibold">General Info</h1>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        disabled={isLoading}
        initialValues={{
          label: data.label || "",
          hostname: data.hostname || "",
          tags: data.tags || [],
        }}
      >
        <Form.Item name="label" label="Label" rules={[{ required: true }]}>
          <Input
            classNames={{
              input: "border h-8 px-2 focus-visible:!border-primary",
            }}
          />
        </Form.Item>
        <Form.Item
          name="hostname"
          label="Hostname"
          rules={[{ required: true }]}
        >
          <Input
            classNames={{
              input: "border h-8 px-2 focus-visible:!border-primary",
            }}
          />
        </Form.Item>
        <Form.Item name="tags" label="Tags">
          <Select
            mode="tags"
            tokenSeparators={[","]}
            allowClear
            rootClassName="[&_span]:text-sm"
            optionFilterProp="label"
            options={[
              { label: "Name", value: "name" },
              { label: "Environment", value: "environment" },
              { label: "Cost Center", value: "cost-center" },
              { label: "Project", value: "project" },
              { label: "Owner", value: "owner" },
              { label: "Application", value: "application" },
              { label: "Version", value: "version" },
              { label: "Department", value: "department" },
              { label: "CreatedBy", value: "created-by" },
              { label: "Team", value: "team" },
            ]}
          />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            className="btn h-9 flex items-center justify-center gap-2 w-full"
            loading={isLoading}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default GeneralInfoForm;

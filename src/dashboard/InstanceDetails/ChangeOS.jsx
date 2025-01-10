import { useParams } from "react-router-dom";
import {
  useGetInstanceByIdQuery,
  useGetInstanceAvailableUpgradesQuery,
  useUpdateInstanceMutation,
} from "../../redux/apis/apiSlice";
import { Button, Form, message, Select } from "antd";
import { useMemo } from "react";

const ChangeOS = () => {
  const { instanceId } = useParams();
  const { data: instance } = useGetInstanceByIdQuery(instanceId);
  const [form] = Form.useForm();
  const [updateInstance, { isLoading }] = useUpdateInstanceMutation();

  const { status, data: upgrades } =
    useGetInstanceAvailableUpgradesQuery(instanceId);

  const options = useMemo(() => {
    return (
      upgrades?.os.map((os) => ({
        value: os.id,
        label: os.name,
      })) || []
    );
  }, [upgrades?.os]);

  const onFinish = async ({ os_id }) => {
    const { error } = await updateInstance({ id: instanceId, os_id });
    if (error) {
      message.error(error.message || "Failed to update OS!");
    } else {
      message.success("Operating system updated successfully!");
    }
  };

  return (
    <div className="space-y-4 max-w-[600px] w-full">
      <h1 className="text-2xl font-semibold">New Operating System</h1>
      <div className="space-y-2.5 p-3 rounded-none border-l-8 border-amber-400 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
        <h1 className="text-base font-bold">WARNING</h1>
        <p className="text-sm font-medium text-amber-500">
          Changing to a different operating system will
          <br />
          <span className="font-bold">WIPE ALL THE DATA</span> on your server.
        </p>
      </div>

      <p className="text-sm text-zinc-500">
        <strong>Currently installed:</strong> {instance?.os}
      </p>

      <Form
        form={form}
        onFinish={onFinish}
        disabled={isLoading}
        layout="vertical"
      >
        <Form.Item
          name="os_id"
          label="Operating System"
          rules={[{ required: true }]}
        >
          <Select
            showSearch
            disabled={isLoading || status === "pending"}
            loading={status === "pending"}
            rootClassName="[&_span]:text-sm"
            options={options}
            placeholder="Select an operating system"
            optionFilterProp="label"
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

export default ChangeOS;

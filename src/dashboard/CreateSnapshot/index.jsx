import { Button, Form, Input, message, Select } from "antd";
import { useCreateSnapshotMutation } from "../../redux/apis/snapshots";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllInstancesQuery } from "../../redux/apis/instances";

const CreateSnapshot = () => {
  const { data, status } = useGetAllInstancesQuery();

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const options = useMemo(() => {
    return data?.map((item) => ({
      label: `${item.label} - ${item.ram.toFixed()} MB - ${item.main_ip}`,
      value: item.id,
    }));
  }, [data]);

  const [createSnapshot, { isLoading }] = useCreateSnapshotMutation();

  const onFinish = async (values) => {
    const { error } = await createSnapshot(values);
    if (error) {
      message.error(error.data.message || "Failed to create snapshot");
    } else {
      message.success("Snapshot created");
      navigate("/snapshot");
    }
  };

  return (
    <div className="tailwind-layout">
      <div className="w-full max-w-2xl px-12 py-8">
        <div className="p-4 space-y-4 border rounded-lg shadow-sm border-zinc-200">
          <h1 className="text-2xl font-semibold">
            Take a snapshot of an active server
          </h1>

          <Form
            form={form}
            clearOnDestroy
            layout="vertical"
            disabled={isLoading}
            onFinish={onFinish}
          >
            <Form.Item
              name="instanceId"
              label="Instance"
              rules={[{ required: true }]}
            >
              <Select
                options={options}
                loading={status === "pending"}
                disabled={isLoading || status === "pending"}
                rootClassName="[&_span]:text-sm"
                placeholder="Select an instance"
              />
            </Form.Item>

            <Form.Item
              name="description"
              label="Label"
              rules={[{ required: true }]}
            >
              <Input className="border focus-visible:!border-primary px-2 h-8" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="w-full text-white h-9 bg-primary"
            >
              Take snapshot
            </Button>
          </Form>

          <ul className="space-y-2 list-disc px-4 mt-6 !text-sm leading-snug text-zinc-400">
            <li>
              Stored snapshots will cost ${process.env.REACT_APP_SNAPSHOT_COST}
              /GB per month - pricing subject to change.
            </li>
            <li>
              We recommend using DHCP for networking. By default, Bravt Cloud
              instances are configured to use DHCP.
            </li>
            <li>
              Snapshots can only be restored to equal or bigger disks. If there
              is a single partition, it will be automatically expanded.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateSnapshot;

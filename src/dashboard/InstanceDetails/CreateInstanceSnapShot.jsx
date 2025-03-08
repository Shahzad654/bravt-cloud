import { Button, Card, Form, Input, message } from "antd";
import { useCreateSnapshotMutation } from "../../redux/apis/snapshots";
import { useParams } from "react-router-dom";

const CreateInstanceSnapShot = () => {
  const [form] = Form.useForm();
  const [createSnapshot, { isLoading }] = useCreateSnapshotMutation();
  const { instanceId } = useParams();

  const onFinish = async ({ description }) => {
    const { error } = await createSnapshot({ description, instanceId });
    if (error) {
      message.error(error.data.message || "Failed to create snapshot");
    } else {
      message.success("Snapshot created");
    }
  };

  return (
    <div className="w-full mt-4 bg-white">
      <h1 className="text-2xl font-semibold">Take Snapshot</h1>
      <Card className="w-full max-w-2xl mt-4 border">
        <Form
          form={form}
          clearOnDestroy
          layout="vertical"
          disabled={isLoading}
          onFinish={onFinish}
        >
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
            Snapshots can only be restored to equal or bigger disks. If there is
            a single partition, it will be automatically expanded.
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default CreateInstanceSnapShot;

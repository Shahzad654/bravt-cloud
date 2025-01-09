import { useParams } from "react-router-dom";
import {
  useGetInstanceByIdQuery,
  useGetInstanceAvailableUpgradesQuery,
  useUpdateInstanceMutation,
} from "../../redux/apis/apiSlice";
import { Button, Form, message, Select } from "antd";
import { useMemo } from "react";

const ChangePlan = () => {
  const { instanceId } = useParams();
  const { data: instance } = useGetInstanceByIdQuery(instanceId);
  const [form] = Form.useForm();
  const [updateInstance, { isLoading }] = useUpdateInstanceMutation();

  const { status, data: upgrades } =
    useGetInstanceAvailableUpgradesQuery(instanceId);

  const options = useMemo(() => {
    return (
      upgrades?.plans.map((plan) => ({
        value: plan,
        label: plan,
      })) || []
    );
  }, [upgrades?.plans]);

  const onFinish = async ({ plan }) => {
    const { error } = await updateInstance({ id: instanceId, plan });
    if (error) {
      message.error(error.message || "Failed to update plan!");
    } else {
      message.success("Plan updated successfully!");
    }
  };

  return (
    <div className="space-y-4 max-w-[600px] w-full">
      <h1 className="text-2xl font-semibold">Current Plan</h1>

      <p className="text-sm text-zinc-500">
        Regular Cloud Compute
        <br />
        <strong>
          {instance.vcpu_count} vCPU{instance.vcpu_count > 1 ? "s" : ""},{" "}
          {instance.ram} MB RAM, {instance.disk.toFixed(2)} GB SSD
        </strong>
      </p>

      <h1 className="text-2xl font-semibold">Change Plan</h1>

      <Form
        form={form}
        onFinish={onFinish}
        disabled={isLoading}
        layout="vertical"
      >
        <Form.Item name="plan" label="Plan" rules={[{ required: true }]}>
          <Select
            showSearch
            disabled={isLoading || status === "pending"}
            loading={status === "pending"}
            rootClassName="[&_span]:text-sm"
            options={options}
            placeholder="Select a plan"
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

export default ChangePlan;
